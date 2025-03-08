
import { calculateDaysRemaining, formatDateLocale } from "../../utils/dateUtils";

export interface ITrial {
  starts_at: string | null;
  ends_at: string | null;
  days_remaining: number;
  is_active: boolean;
  formatted_end_date: string;
}

export interface ITrialResponse {
  trial?: ITrial;
  error?: string;
}

/**
 * Deneme süresi modeli oluşturur
 */
export const createTrialModel = (
  trialStartsAt: string | null,
  trialEndsAt: string | null,
  status: string
): ITrial => {
  const daysRemaining = calculateDaysRemaining(trialEndsAt);
  const isActive = status === 'trial' && daysRemaining > 0;
  
  return {
    starts_at: trialStartsAt,
    ends_at: trialEndsAt,
    days_remaining: daysRemaining,
    is_active: isActive,
    formatted_end_date: formatDateLocale(trialEndsAt)
  };
};
