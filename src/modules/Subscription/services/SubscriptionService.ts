
import { supabase } from "@/lib/supabase";
import { ISubscription } from "../interfaces/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class SubscriptionService {
  private static logger = LoggerService.getInstance("SubscriptionService");

  /**
   * Kullanıcının abonelik bilgilerini getirir
   */
  static async getCurrentSubscription(): Promise<ISubscription | null> {
    try {
      this.logger.debug("Kullanıcı abonelik bilgileri getiriliyor");
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        this.logger.error("Aktif oturum bulunamadı");
        return null;
      }
      
      // session.user.id kullanarak kullanıcının kendi verilerine erişim
      const userId = session.user.id;
      
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) {
        this.logger.error("Abonelik bilgileri alınamadı", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Kullanıcının premium üyeliğe sahip olup olmadığını kontrol eder
   */
  static async isPremium(): Promise<boolean> {
    try {
      const subscription = await this.getCurrentSubscription();
      
      if (!subscription) {
        return false;
      }
      
      return subscription.type === 'premium';
    } catch (error) {
      this.logger.error("Premium kontrolü yapılırken hata oluştu", error);
      return false;
    }
  }

  /**
   * Kullanıcının deneme süresinin dolup dolmadığını kontrol eder
   */
  static async isTrialExpired(): Promise<boolean> {
    try {
      const subscription = await this.getCurrentSubscription();
      
      if (!subscription || !subscription.trial_ends_at) {
        return true;
      }
      
      const trialEndsAt = new Date(subscription.trial_ends_at);
      const now = new Date();
      
      return now > trialEndsAt;
    } catch (error) {
      this.logger.error("Deneme süresi kontrolü yapılırken hata oluştu", error);
      return true; // Hata durumunda deneme süresinin bittiğini varsay (güvenli yaklaşım)
    }
  }

  /**
   * Kullanıcının deneme süresinin bitimine kaç gün kaldığını hesaplar
   */
  static async getRemainingTrialDays(): Promise<number | null> {
    try {
      const subscription = await this.getCurrentSubscription();
      
      if (!subscription || !subscription.trial_ends_at || subscription.type !== 'trial') {
        return null;
      }
      
      const trialEndsAt = new Date(subscription.trial_ends_at);
      const now = new Date();
      
      // Milisaniyeden gün hesabı
      const remainingMilliseconds = trialEndsAt.getTime() - now.getTime();
      const remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
      
      return remainingDays > 0 ? remainingDays : 0;
    } catch (error) {
      this.logger.error("Kalan gün hesaplanırken hata oluştu", error);
      return null;
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
      
      const userId = session.user.id;
      
      const { error } = await supabase
        .from("subscriptions")
        .update({
          type: 'premium',
          updated_at: new Date().toISOString()
        })
        .eq("user_id", userId);
      
      if (error) {
        this.logger.error("Premium aboneliğe geçiş başarısız oldu", error);
        throw error;
      }
      
      this.logger.info("Kullanıcı premium aboneliğe geçti", { userId });
      return true;
    } catch (error) {
      this.logger.error("Premium aboneliğe geçiş yapılırken hata oluştu", error);
      throw error;
    }
  }
}
