
export enum SubscriptionPlanType {
  TRIAL = 'trial',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled'
}

export interface ISubscription {
  id: string;
  user_id: string;
  plan_type: SubscriptionPlanType;
  status: SubscriptionStatus;
  trial_starts_at: Date | null;
  trial_ends_at: Date | null;
  current_period_starts_at: Date | null;
  current_period_ends_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ISubscriptionSummary {
  status: SubscriptionStatus;
  plan: SubscriptionPlanType;
  daysRemaining: number;
  isActive: boolean;
  expiresAt: Date | null;
}
