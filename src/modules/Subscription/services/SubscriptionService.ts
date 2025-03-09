
import { supabase } from "@/integrations/supabase/client";
import { 
  ISubscription, 
  ISubscriptionSummary, 
  SubscriptionStatus, 
  SubscriptionPlanType 
} from "../types/ISubscription";
import { 
  ISubscriptionResponse, 
  ISubscriptionListResponse, 
  IUpdateSubscriptionResponse 
} from "../types/ISubscriptionResponse";
import { getDaysRemaining } from "../utils/dateUtils";
import { subscriptionLogger } from "../logging";

/**
 * Subscription işlemlerini yöneten servis
 */
export class SubscriptionService {
  /**
   * Kullanıcının aktif aboneliğini getirir
   */
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    try {
      subscriptionLogger.debug('Kullanıcının aboneliği getiriliyor', { userId });
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        subscriptionLogger.error('Abonelik bilgisi alınırken hata oluştu', error, { userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      if (!data) {
        subscriptionLogger.warn('Kullanıcı için abonelik bulunamadı', { userId });
        return {
          success: false,
          error: 'Abonelik bulunamadı'
        };
      }
      
      const subscription = this.mapDbResponseToSubscription(data);
      subscriptionLogger.debug('Abonelik bilgisi başarıyla alındı', { 
        userId, 
        subscriptionId: subscription.id
      });
      
      return {
        success: true,
        subscription
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik bilgisi alınırken beklenmeyen hata', error, { userId });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
  
  /**
   * Kullanıcının abonelik özetini getirir
   */
  static async getSubscriptionSummary(userId: string): Promise<ISubscriptionSummary | null> {
    try {
      const response = await this.getUserSubscription(userId);
      
      if (!response.success || !response.subscription) {
        return null;
      }
      
      const subscription = response.subscription;
      const now = new Date();
      let expiresAt: Date | null = null;
      let daysRemaining = 0;
      let isActive = false;
      let isTrial = subscription.status === SubscriptionStatus.TRIAL;
      
      // Abonelik durumuna göre hesaplama yap
      if (subscription.status === SubscriptionStatus.TRIAL && subscription.trial_ends_at) {
        expiresAt = new Date(subscription.trial_ends_at);
        daysRemaining = getDaysRemaining(expiresAt);
        isActive = expiresAt > now;
      } else if (subscription.status === SubscriptionStatus.ACTIVE && subscription.current_period_ends_at) {
        expiresAt = new Date(subscription.current_period_ends_at);
        daysRemaining = getDaysRemaining(expiresAt);
        isActive = expiresAt > now;
      }
      
      return {
        status: subscription.status,
        plan: subscription.plan_type,
        daysRemaining,
        isActive,
        isTrial,
        expiresAt
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik özeti alınırken hata oluştu', error, { userId });
      return null;
    }
  }
  
  /**
   * Kullanıcının abonelik planını günceller
   */
  static async updateSubscriptionPlan(
    userId: string, 
    planType: SubscriptionPlanType
  ): Promise<IUpdateSubscriptionResponse> {
    try {
      subscriptionLogger.debug('Abonelik planı güncelleniyor', { userId, planType });
      
      // Kullanıcının mevcut aboneliğini getir
      const currentSubscription = await this.getUserSubscription(userId);
      
      if (!currentSubscription.success || !currentSubscription.subscription) {
        return {
          success: false,
          error: 'Güncellenecek abonelik bulunamadı'
        };
      }
      
      // Tarih hesaplamaları ve plan değişiklikleri burada yapılabilir
      // Örneğin yeni bitiş tarihi hesaplama, ücret hesaplama vb.
      
      // Örnek: Planı güncelle ve durumu aktif yap
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          plan_type: planType,
          status: SubscriptionStatus.ACTIVE,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .maybeSingle();
      
      if (error) {
        subscriptionLogger.error('Abonelik güncellenirken hata oluştu', error, { userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      const updatedSubscription = this.mapDbResponseToSubscription(data);
      subscriptionLogger.info('Abonelik planı başarıyla güncellendi', { 
        userId, 
        newPlan: planType 
      });
      
      return {
        success: true,
        updated: true,
        subscription: updatedSubscription
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik planı güncellenirken beklenmeyen hata', error, { userId });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
  
  /**
   * Veritabanı yanıtını ISubscription tipine dönüştürür
   */
  private static mapDbResponseToSubscription(data: any): ISubscription {
    return {
      id: data.id,
      user_id: data.user_id,
      plan_type: data.plan_type,
      status: data.status,
      trial_starts_at: data.trial_starts_at ? new Date(data.trial_starts_at) : null,
      trial_ends_at: data.trial_ends_at ? new Date(data.trial_ends_at) : null,
      current_period_starts_at: data.current_period_starts_at ? new Date(data.current_period_starts_at) : null,
      current_period_ends_at: data.current_period_ends_at ? new Date(data.current_period_ends_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  }
}
