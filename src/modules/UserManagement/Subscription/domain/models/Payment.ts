
import { calculateDaysRemaining, formatDateLocale } from "../../../core/utils/dateUtils";
import { PricingPlanType } from "@/modules/LandingPage/components/PricingSection/types/pricing.types";

export interface IPayment {
  plan_type: PricingPlanType;
  period_starts_at: string | null;
  period_ends_at: string | null;
  days_remaining: number;
  is_active: boolean;
  formatted_end_date: string;
}

export interface IPaymentResponse {
  payment?: IPayment;
  error?: string;
}

/**
 * Ödeme dönemi modeli oluşturur
 */
export const createPaymentModel = (
  planType: PricingPlanType,
  periodStartsAt: string | null,
  periodEndsAt: string | null,
  isSubscriptionActive: boolean
): IPayment => {
  const daysRemaining = calculateDaysRemaining(periodEndsAt);
  const isActive = isSubscriptionActive && daysRemaining > 0;
  
  return {
    plan_type: planType,
    period_starts_at: periodStartsAt,
    period_ends_at: periodEndsAt,
    days_remaining: daysRemaining,
    is_active: isActive,
    formatted_end_date: formatDateLocale(periodEndsAt)
  };
};
