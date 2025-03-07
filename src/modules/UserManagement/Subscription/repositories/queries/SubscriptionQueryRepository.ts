
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ISubscription } from "../../domain/models/Subscription";
import { ISubscriptionQueryRepository } from "../interfaces/ISubscriptionQueryRepository";

export class SubscriptionQueryRepository implements ISubscriptionQueryRepository {
  private logger = LoggerService.getInstance("SubscriptionQueryRepository");

  /**
   * Kullanıcının abonelik bilgilerini getir
   */
  async getByUserId(userId: string): Promise<{ subscription?: ISubscription, error?: string }> {
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
}
