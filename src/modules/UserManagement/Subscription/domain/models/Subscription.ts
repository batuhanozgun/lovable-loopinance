
import { PricingPlanType } from "@/modules/LandingPage/components/PricingSection/types/pricing.types";
import { ITrial } from "./Trial";
import { IPayment } from "./Payment";

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

/**
 * Abonelik modeli
 */
export interface ISubscription {
  id: string;
  user_id: string;
  status: SubscriptionStatus;
  plan_type: PricingPlanType;
  trial_starts_at: string;
  trial_ends_at: string;
  current_period_starts_at?: string;
  current_period_ends_at?: string;
  created_at: string;
  updated_at: string;
  
  // Çalışma zamanında hesaplanan değerler
  trial?: ITrial;
  payment?: IPayment;
}

export interface ISubscriptionResponse {
  success: boolean;
  subscription?: ISubscription;
  error?: string;
  daysRemaining?: number;
}

/**
 * Trial ve Payment'ı Subscription modeline ekle
 */
export const enhanceSubscriptionModel = (
  subscription: ISubscription,
  trial: ITrial,
  payment?: IPayment
): ISubscription => {
  return {
    ...subscription,
    trial,
    payment
  };
};
