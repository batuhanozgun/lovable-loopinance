
import { ISubscription } from "../../interfaces/ISubscription";

/**
 * Deneme süresinin bitimine kalan gün sayısını hesaplar
 */
export const calculateRemainingTrialDays = (subscription: ISubscription | null): number | null => {
  if (!subscription || !subscription.trial_ends_at) {
    return null;
  }
  
  const trialEndDate = new Date(subscription.trial_ends_at);
  const currentDate = new Date();
  
  // Trial süresi zaten bittiyse 0 döndür
  if (currentDate > trialEndDate) {
    return 0;
  }
  
  // Kalan milisaniyeleri hesapla ve günlere çevir
  const remainingTime = trialEndDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  
  return remainingDays;
};

/**
 * Deneme süresinin bitip bitmediğini kontrol eder
 */
export const isTrialExpired = (subscription: ISubscription | null): boolean => {
  if (!subscription || !subscription.trial_ends_at) {
    return true;
  }
  
  const trialEndDate = new Date(subscription.trial_ends_at);
  const currentDate = new Date();
  
  return currentDate > trialEndDate;
};
