
import { Database } from "@/integrations/supabase/types";
import { SubscriptionPlanType, SubscriptionStatus } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";

// Supabase'den plan tipi ve durumu için tip tanımları
type SupabasePlanType = Database["public"]["Enums"]["subscription_plan_type"];
type SupabaseStatus = Database["public"]["Enums"]["subscription_status"];

/**
 * Abonelik durumu dönüşümlerini yöneten servis
 */
export class SubscriptionStatusService {
  /**
   * Uygulama enum değerini Supabase plan tipine dönüştürür
   */
  static mapPlanTypeToSupabase(planType: SubscriptionPlanType): SupabasePlanType {
    switch (planType) {
      case SubscriptionPlanType.TRIAL:
        return 'trial';
      case SubscriptionPlanType.MONTHLY:
        return 'monthly';
      case SubscriptionPlanType.YEARLY:
        return 'yearly';
      default:
        subscriptionLogger.error('Bilinmeyen plan tipi', { planType });
        return 'trial'; // Varsayılan olarak trial döndür
    }
  }

  /**
   * Uygulama enum değerini Supabase durum değerine dönüştürür
   */
  static mapStatusToSupabase(status: SubscriptionStatus): SupabaseStatus {
    switch (status) {
      case SubscriptionStatus.TRIAL:
        return 'trial';
      case SubscriptionStatus.ACTIVE:
        return 'active';
      case SubscriptionStatus.EXPIRED:
        return 'expired';
      case SubscriptionStatus.CANCELED:
        return 'cancelled'; // Dikkat: Enum değeri 'CANCELED' iken Supabase'de 'cancelled'
      default:
        subscriptionLogger.error('Bilinmeyen durum', { status });
        return 'trial'; // Varsayılan olarak trial döndür
    }
  }
  
  /**
   * Plan tipine göre uygun durum değerini belirler
   */
  static determineStatusForPlan(planType: SubscriptionPlanType): SubscriptionStatus {
    if (planType === SubscriptionPlanType.TRIAL) {
      return SubscriptionStatus.TRIAL;
    }
    return SubscriptionStatus.ACTIVE;
  }
}
