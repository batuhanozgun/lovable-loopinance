
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISubscription, ISubscriptionResponse } from "../types/ISubscription";

export class SubscriptionService {
  private static logger = LoggerService.getInstance("SubscriptionService");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    try {
      this.logger.debug("Kullanıcı abonelik bilgileri alınıyor", { userId });

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        this.logger.error("Abonelik bilgileri alınamadı", { userId, error });
        return {
          success: false,
          error: error.message
        };
      }

      const subscription = data as ISubscription;
      
      // Deneme süresi için kalan gün hesaplama
      const daysRemaining = subscription.status === 'trial' 
        ? this.calculateDaysRemaining(subscription.trial_ends_at)
        : this.calculateDaysRemaining(subscription.current_period_ends_at);

      this.logger.debug("Kullanıcı abonelik bilgileri başarıyla alındı", { 
        userId, 
        status: subscription.status,
        daysRemaining 
      });
      
      return {
        success: true,
        subscription,
        daysRemaining
      };
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken beklenmeyen hata", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Abonelik bilgileri alınamadı"
      };
    }
  }

  /**
   * Kullanıcının abonelik durumunu kontrol et
   */
  static async checkSubscriptionStatus(userId: string): Promise<ISubscriptionResponse> {
    try {
      const response = await this.getUserSubscription(userId);
      
      if (!response.success || !response.subscription) {
        return response;
      }
      
      const subscription = response.subscription;
      
      // Trial süresi dolmuş mu kontrol et
      if (subscription.status === 'trial') {
        const trialEndsAt = new Date(subscription.trial_ends_at);
        const now = new Date();
        
        if (now > trialEndsAt) {
          this.logger.info("Kullanıcının deneme süresi dolmuş", { userId });
          
          // Deneme süresi dolan kullanıcının durumunu güncelle
          await this.updateSubscriptionStatus(userId, 'expired');
          
          return {
            success: true,
            subscription: {
              ...subscription,
              status: 'expired'
            },
            daysRemaining: 0
          };
        }
      }
      
      // Aktif abonelik süresi dolmuş mu kontrol et
      if (subscription.status === 'active' && subscription.current_period_ends_at) {
        const periodEndsAt = new Date(subscription.current_period_ends_at);
        const now = new Date();
        
        if (now > periodEndsAt) {
          this.logger.info("Kullanıcının aktif abonelik süresi dolmuş", { userId });
          
          // Süresi dolan kullanıcının durumunu güncelle
          await this.updateSubscriptionStatus(userId, 'expired');
          
          return {
            success: true,
            subscription: {
              ...subscription,
              status: 'expired'
            },
            daysRemaining: 0
          };
        }
      }
      
      return response;
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken beklenmeyen hata", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Abonelik durumu kontrol edilemedi"
      };
    }
  }

  /**
   * Abonelik durumunu güncelle
   */
  private static async updateSubscriptionStatus(
    userId: string, 
    status: 'trial' | 'active' | 'expired' | 'cancelled'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
      
      if (error) {
        this.logger.error("Abonelik durumu güncellenemedi", { userId, status, error });
        return false;
      }
      
      this.logger.info("Abonelik durumu güncellendi", { userId, status });
      return true;
    } catch (error) {
      this.logger.error("Abonelik durumu güncellenirken beklenmeyen hata", error);
      return false;
    }
  }

  /**
   * Kalan gün sayısını hesapla
   */
  private static calculateDaysRemaining(endDateStr?: string): number {
    if (!endDateStr) return 0;
    
    const endDate = new Date(endDateStr);
    const now = new Date();
    
    // Süre dolmuşsa 0 gün kaldı
    if (now > endDate) return 0;
    
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
}
