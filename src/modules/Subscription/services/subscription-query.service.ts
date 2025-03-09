
import { supabase } from "@/integrations/supabase/client";
import { ISubscription } from "../types/ISubscription";
import { ISubscriptionResponse, ISubscriptionListResponse } from "../types/ISubscriptionResponse";
import { subscriptionLogger } from "../logging";
import { SubscriptionMapperService } from "./subscription-mapper.service";

/**
 * Abonelik bilgilerini sorgulama işlemlerini yöneten servis
 */
export class SubscriptionQueryService {
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
      
      const subscription = SubscriptionMapperService.mapDbResponseToSubscription(data);
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
}
