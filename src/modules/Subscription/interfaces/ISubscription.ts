
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
