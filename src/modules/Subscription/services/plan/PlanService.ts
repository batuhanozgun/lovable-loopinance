
import { supabase } from "@/lib/supabase";
import { SubscriptionPlan, SubscriptionType } from "../../interfaces/subscription/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SUBSCRIPTION_PLANS } from "../../constants/planConstants";

export class PlanService {
  private static logger = LoggerService.getInstance("PlanService");
  
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
        features: Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features),
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
    return SUBSCRIPTION_PLANS;
  }

  /**
   * Verilen abonelik tipine göre plan detaylarını döndürür
   */
  static getSubscriptionPlanByType(type: SubscriptionType, interval: 'monthly' | 'yearly' = 'monthly'): SubscriptionPlan | null {
    const plans = this.getSubscriptionPlans();
    return plans.find(plan => plan.type === type && plan.interval === interval) || null;
  }
}
