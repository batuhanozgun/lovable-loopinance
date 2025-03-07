
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISubscription } from "../types/ISubscription";

export class SubscriptionRepository {
  private static logger = LoggerService.getInstance("SubscriptionRepository");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  static async getByUserId(userId: string): Promise<{ subscription?: ISubscription, error?: string }> {
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
          error: error.message
        };
      }

      return {
        subscription: data as ISubscription
      };
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken beklenmeyen hata", error);
      return {
        error: error instanceof Error ? error.message : "Abonelik bilgileri alınamadı"
      };
    }
  }

  /**
   * Abonelik durumunu güncelle
   */
  static async updateStatus(
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
}
