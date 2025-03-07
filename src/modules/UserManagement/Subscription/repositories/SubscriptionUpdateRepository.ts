
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SubscriptionStatus } from "../types/ISubscription";
import { ISubscriptionUpdateRepository } from "./interfaces/ISubscriptionUpdateRepository";

export class SubscriptionUpdateRepository implements ISubscriptionUpdateRepository {
  private logger = LoggerService.getInstance("SubscriptionUpdateRepository");

  /**
   * Abonelik durumunu güncelle
   */
  async updateStatus(
    userId: string, 
    status: SubscriptionStatus
  ): Promise<boolean> {
    try {
      this.logger.debug("Abonelik durumu güncelleniyor", { userId, status });
      
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
