
import { PricingPlanType } from "@/modules/LandingPage/components/PricingSection/types/pricing.types";

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

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
}

export interface ISubscriptionResponse {
  success: boolean;
  subscription?: ISubscription;
  error?: string;
  daysRemaining?: number;
}
