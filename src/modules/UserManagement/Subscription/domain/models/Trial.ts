
import { SubscriptionStatus } from "./Subscription";

/**
 * Deneme süresi modeli
 */
export interface ITrial {
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  days_remaining: number;
}

export interface ITrialResponse {
  success: boolean;
  trial?: ITrial;
  error?: string;
}

/**
 * Trial modeli oluştur
 */
export const createTrialModel = (
  trialStartsAt: string,
  trialEndsAt: string,
  status: SubscriptionStatus
): ITrial => {
  const now = new Date();
  const endDate = new Date(trialEndsAt);
  
  // Kalan gün hesaplama
  const diffTime = Math.max(0, endDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    starts_at: trialStartsAt,
    ends_at: trialEndsAt,
    is_active: status === 'trial' && diffDays > 0,
    days_remaining: diffDays
  };
};
