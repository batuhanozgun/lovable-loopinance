
export type SubscriptionType = 'trial' | 'premium';

export interface ISubscription {
  id: string;
  user_id: string;
  type: SubscriptionType;
  trial_ends_at: string | null;
  is_trial_notified: boolean;
  created_at: string;
  updated_at: string;
}

// Yeni eklenecek interface'ler
export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  available_in_trial: boolean;
  available_in_premium: boolean;
}

export interface SubscriptionPlan {
  type: SubscriptionType;
  duration: string;
  features: string[];
}
