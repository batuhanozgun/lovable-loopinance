
export type SubscriptionType = 'trial' | 'premium' | 'basic' | 'business';
export type SubscriptionStatus = 'loading' | 'trial' | 'premium' | 'basic' | 'business' | 'expired' | 'error' | 'unauthenticated';
export type SubscriptionInterval = 'monthly' | 'yearly';

export interface ISubscription {
  id: string;
  user_id: string;
  type: SubscriptionType;
  trial_ends_at: string | null;
  is_trial_notified: boolean;
  created_at: string;
  updated_at: string;
  current_period_start?: string | null;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  plan_id?: string | null;
  status?: string;
  timezone?: string;
  metadata?: Record<string, any>;
  notification_settings?: {
    trialEndWarning: boolean;
    paymentReminders: boolean;
    featureUpdates: boolean;
  };
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  available_in_trial: boolean;
  available_in_premium: boolean;
  available_in_basic: boolean;
  available_in_business: boolean;
}

export interface SubscriptionPlan {
  id: string;
  type: SubscriptionType;
  name: string;
  price: number;
  interval: SubscriptionInterval;
  features: string[];
  description?: string;
}

export interface SubscriptionState {
  subscription: ISubscription | null;
  status: SubscriptionStatus;
  plan: SubscriptionPlan | null;
  trialInfo: {
    isExpired: boolean;
    remainingDays: number | null;
    endDate: string | null;
  } | null;
  loading: boolean;
  error: Error | null;
}

export interface SubscriptionReturnType {
  subscription: ISubscription | null;
  status: SubscriptionStatus;
  plan: SubscriptionPlan | null;
  isLoading: boolean;
  isTrialExpired: boolean;
  isPremium: boolean;
  remainingDays: number | null;
  error: Error | null;
  refetch: () => Promise<void>;
}
