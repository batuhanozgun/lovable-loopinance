
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
    planType: SubscriptionPlanType
  ): Promise<IUpdateSubscriptionResponse> {
    try {
      subscriptionLogger.debug('Abonelik planı güncelleniyor', { userId, planType });
      
      // Kullanıcının mevcut aboneliğini getir
      const currentSubscription = await SubscriptionQueryService.getUserSubscription(userId);
      
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
      
      const updatedSubscription = SubscriptionMapperService.mapDbResponseToSubscription(data);
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
}
