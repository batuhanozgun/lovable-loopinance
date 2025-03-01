
import { supabase } from "@/integrations/supabase/client";
import { ISubscription, SubscriptionPlan, SubscriptionType } from "../interfaces/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { DEFAULT_SUBSCRIPTION_PLANS } from "../constants/planConstants";

export class SubscriptionService {
  private static logger = LoggerService.getInstance("SubscriptionService");
  private static CACHE_TTL = 5 * 60 * 1000; // 5 dakika
  private static subscriptionCache: {
    data: ISubscription | null;
    timestamp: number;
  } | null = null;

  /**
   * Abonelik bilgilerinin önbelleğini temizler
   */
  static clearCache() {
    this.subscriptionCache = null;
    this.logger.debug("Abonelik önbelleği temizlendi");
  }

  /**
   * Cache'den abonelik bilgilerini alır
   */
  static getSubscriptionCache(): ISubscription | null {
    const now = Date.now();
    if (
      this.subscriptionCache && 
      this.subscriptionCache.data && 
      now - this.subscriptionCache.timestamp < this.CACHE_TTL
    ) {
      this.logger.debug("Abonelik bilgileri cache'den alındı");
      return this.subscriptionCache.data;
    }
    return null;
  }

  /**
   * Cache'e abonelik bilgilerini kaydeder
   */
  static setSubscriptionCache(data: ISubscription | null): void {
    this.subscriptionCache = {
      data,
      timestamp: Date.now()
    };
    this.logger.debug("Abonelik bilgileri cache'e kaydedildi");
  }

  /**
   * Cache TTL süresini günceller
   */
  static setCacheTTL(milliseconds: number): void {
    this.CACHE_TTL = milliseconds;
    this.logger.debug(`Cache TTL süresi ${milliseconds}ms olarak güncellendi`);
  }

  /**
   * Kullanıcının abonelik bilgilerini getirir, cache kullanarak
   */
  static async getCurrentSubscription(): Promise<ISubscription | null> {
    try {
      // Cache'i kontrol et
      const cachedData = this.getSubscriptionCache();
      if (cachedData) {
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
      this.setSubscriptionCache(data as ISubscription);
      
      return data as ISubscription;
    } catch (error) {
      this.logger.error("Abonelik bilgileri alınırken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Kullanıcı aboneliğinin durumunu ve tüm bilgilerini tek seferde getirir
   */
  static async getSubscriptionStatus(): Promise<{
    subscription: ISubscription | null;
    isPremium: boolean;
    isTrialExpired: boolean;
    remainingDays: number | null;
  }> {
    try {
      const subscription = await this.getCurrentSubscription();
      
      if (!subscription) {
        return {
          subscription: null,
          isPremium: false,
          isTrialExpired: true,
          remainingDays: null
        };
      }
      
      // Premium durumu
      const isPremium = subscription.type === 'premium';
      
      // Trial durumu
      let isTrialExpired = true;
      let remainingDays = null;
      
      if (subscription.type === 'trial' && subscription.trial_ends_at) {
        const trialEndsAt = new Date(subscription.trial_ends_at);
        const now = new Date();
        
        isTrialExpired = now > trialEndsAt;
        
        if (!isTrialExpired) {
          // Milisaniyeden gün hesabı
          const remainingMilliseconds = trialEndsAt.getTime() - now.getTime();
          remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
        } else {
          remainingDays = 0;
        }
      }
      
      return {
        subscription,
        isPremium,
        isTrialExpired,
        remainingDays
      };
    } catch (error) {
      this.logger.error("Abonelik durumu kontrol edilirken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Kullanıcının premium üyeliğe sahip olup olmadığını kontrol eder
   */
  static async isPremium(): Promise<boolean> {
    try {
      const { isPremium } = await this.getSubscriptionStatus();
      return isPremium;
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
      const { isTrialExpired } = await this.getSubscriptionStatus();
      return isTrialExpired;
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
      const { remainingDays } = await this.getSubscriptionStatus();
      return remainingDays;
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
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq("user_id", userId);
      
      if (error) {
        this.logger.error("Premium aboneliğe geçiş başarısız oldu", error);
        throw error;
      }
      
      // Cache'i temizle
      this.clearCache();
      
      this.logger.info("Kullanıcı premium aboneliğe geçti", { userId });
      return true;
    } catch (error) {
      this.logger.error("Premium aboneliğe geçiş yapılırken hata oluştu", error);
      throw error;
    }
  }

  /**
   * Veritabanından tüm abonelik planlarını getir
   */
  static async getPlansFromDatabase(): Promise<SubscriptionPlan[]> {
    try {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("price", { ascending: true });
      
      if (error) {
        this.logger.error("Abonelik planları alınamadı", error);
        throw error;
      }
      
      return data.map(plan => ({
        id: plan.id,
        type: plan.type as SubscriptionType,
        name: plan.name,
        price: plan.price,
        interval: plan.interval as 'monthly' | 'yearly',
        features: Array.isArray(plan.features) ? plan.features : JSON.parse(JSON.stringify(plan.features)),
        description: plan.description
      }));
    } catch (error) {
      this.logger.error("Planlar alınırken hata oluştu", error);
      return this.getSubscriptionPlans(); // Fallback olarak statik planları döndür
    }
  }

  /**
   * Mevcut abonelik planlarını döndürür
   */
  static getSubscriptionPlans(): SubscriptionPlan[] {
    return DEFAULT_SUBSCRIPTION_PLANS;
  }

  /**
   * Verilen abonelik tipine göre plan detaylarını döndürür
   */
  static getSubscriptionPlanByType(type: SubscriptionType, interval: 'monthly' | 'yearly' = 'monthly'): SubscriptionPlan | null {
    const plans = this.getSubscriptionPlans();
    return plans.find(plan => plan.type === type && plan.interval === interval) || null;
  }
}
