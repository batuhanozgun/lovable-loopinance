
import { supabase } from "@/integrations/supabase/client";
import { ISubscription } from "../../interfaces/subscription/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SubscriptionCacheService } from "../cache/SubscriptionCacheService";

export class SubscriptionService {
  private static logger = LoggerService.getInstance("SubscriptionService");
  private static cacheService = SubscriptionCacheService.getInstance();

  /**
   * Kullanıcının abonelik bilgilerini getirir, cache kullanarak
   */
  static async getCurrentSubscription(): Promise<ISubscription | null> {
    try {
      // Cache'i kontrol et
      const cachedData = this.cacheService.getSubscriptionCache();
      if (cachedData) {
        this.logger.debug("Abonelik bilgileri cache'den alındı");
        return cachedData;
      }

      this.logger.debug("Kullanıcı abonelik bilgileri getiriliyor");
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        this.logger.error("Aktif oturum bulunamadı");
        return null;
      }
      
      // session.user.id kullanarak kullanıcının kendi verilerine erişim
      // RLS kuralları ile korunduğu için sadece kendi verilerini görebilir
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();
      
      if (error) {
        this.logger.error("Abonelik bilgileri alınamadı", error);
        throw error;
      }
      
      // Cache'i güncelle
      this.cacheService.setSubscriptionCache(data);
      
      return data;
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Kullanıcının premium aboneliğe geçişini işler
   */
  static async upgradeToPremium(): Promise<boolean> {
    try {
      this.logger.debug("Premium aboneliğe geçiş yapılıyor");
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        this.logger.error("Aktif oturum bulunamadı");
        return false;
      }
      
      // RLS kuralları ile sadece kendi aboneliğini güncelleyebilir
      const { error } = await supabase
        .from("subscriptions")
        .update({
          type: 'premium',
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq("user_id", session.user.id);
      
      if (error) {
        this.logger.error("Premium aboneliğe geçiş başarısız oldu", error);
        throw error;
      }
      
      // Cache'i temizle
      this.cacheService.clearCache();
      
      this.logger.info("Kullanıcı premium aboneliğe geçti", { userId: session.user.id });
      return true;
    } catch (error) {
      this.logger.error("Premium aboneliğe geçiş yapılırken hata oluştu", error);
      throw error;
    }
  }
}
