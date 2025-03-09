
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlanType, SubscriptionStatus } from "../types/ISubscription";
import { IUpdateSubscriptionResponse } from "../types/ISubscriptionResponse";
import { subscriptionLogger } from "../logging";
import { SubscriptionQueryService } from "./subscription-query.service";
import { SubscriptionMapperService } from "./subscription-mapper.service";

/**
 * Abonelik güncelleme işlemlerini yöneten servis
 */
export class SubscriptionUpdateService {
  /**
   * Kullanıcının abonelik planını günceller
   */
  static async updateSubscriptionPlan(
    userId: string, 
    planType: SubscriptionPlanType,
    transactionId?: string
  ): Promise<IUpdateSubscriptionResponse> {
    try {
      subscriptionLogger.debug('Abonelik planı güncelleniyor', { userId, planType, transactionId });
      
      // Kullanıcının mevcut aboneliğini getir
      const currentSubscription = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!currentSubscription.success || !currentSubscription.subscription) {
        subscriptionLogger.error('Güncellenecek abonelik bulunamadı', { userId });
        return {
          success: false,
          error: 'Güncellenecek abonelik bulunamadı'
        };
      }
      
      // Tarih hesaplamaları için şimdiki zaman
      const now = new Date();
      
      // Yeni bitiş tarihini hesapla
      let periodEndDate: Date;
      
      if (planType === SubscriptionPlanType.MONTHLY) {
        // Aylık plan için 30 gün ekle
        periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + 30);
      } else if (planType === SubscriptionPlanType.YEARLY) {
        // Yıllık plan için 365 gün ekle
        periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + 365);
      } else {
        // Deneme planı için mevcut trial_ends_at kullan
        periodEndDate = currentSubscription.subscription.trial_ends_at || now;
      }
      
      // Güncellenecek verileri hazırla
      const updateData: any = {
        plan_type: planType,
        updated_at: now.toISOString()
      };
      
      // Trial'dan ücretli plana geçiş veya ücretli plan güncelleme
      if (planType !== SubscriptionPlanType.TRIAL) {
        updateData.status = SubscriptionStatus.ACTIVE;
        updateData.current_period_starts_at = now.toISOString();
        updateData.current_period_ends_at = periodEndDate.toISOString();
        
        // Eğer deneme süresi devam ediyorsa, deneme süresini sonlandır
        if (currentSubscription.subscription.status === SubscriptionStatus.TRIAL) {
          updateData.trial_ends_at = now.toISOString();
        }
      }
      
      subscriptionLogger.debug('Abonelik güncelleme verileri hazırlandı', updateData);
      
      // Veritabanını güncelle
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .maybeSingle();
      
      if (error) {
        subscriptionLogger.error('Abonelik güncellenirken Supabase hatası oluştu', error, { userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      if (!data) {
        subscriptionLogger.error('Abonelik güncelleme sonucu boş', { userId });
        return {
          success: false,
          error: 'Güncelleme sonucu boş veri döndü'
        };
      }
      
      const updatedSubscription = SubscriptionMapperService.mapDbResponseToSubscription(data);
      subscriptionLogger.info('Abonelik planı başarıyla güncellendi', { 
        userId, 
        newPlan: planType,
        periodEnd: updateData.current_period_ends_at
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
}
