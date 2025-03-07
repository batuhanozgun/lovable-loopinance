
import { PricingPlanType } from "@/modules/LandingPage/components/PricingSection/types/pricing.types";

export interface IPayment {
  plan_type: PricingPlanType;
  current_period_starts_at?: string;
  current_period_ends_at?: string;
  is_active: boolean;
  days_remaining: number;
}

export interface IPaymentResponse {
  success: boolean;
  payment?: IPayment;
  error?: string;
}

/**
 * Payment modeli oluştur
 */
export const createPaymentModel = (
  planType: PricingPlanType,
  periodStartsAt?: string,
  periodEndsAt?: string,
  isActive: boolean = false
): IPayment => {
  const now = new Date();
  const endDate = periodEndsAt ? new Date(periodEndsAt) : now;
  
  // Kalan gün hesaplama
  const diffTime = Math.max(0, endDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    plan_type: planType,
    current_period_starts_at: periodStartsAt,
    current_period_ends_at: periodEndsAt,
    is_active: isActive && diffDays > 0,
    days_remaining: diffDays
  };
};
