
import { TFunction } from 'i18next';
import { ISubscriptionSummary, SubscriptionPlanType } from '../../../../types/ISubscription';

/**
 * Plan düğmesi metni alma yardımcı fonksiyonu
 */
export const getButtonText = (
  planType: SubscriptionPlanType, 
  subscription: ISubscriptionSummary | null, 
  t: TFunction
): string => {
  // Eğer şu anda aynı plana sahipse "Mevcut Plan" yaz
  if (subscription?.plan === planType && !subscription.isTrial && subscription.isActive) {
    return t('Subscription:subscription.plan.current', { plan: '' }).replace(':', '');
  }
  
  // Eğer deneme sürümündeyse "Yükselt"
  if (subscription?.isTrial) {
    return t('Subscription:actions.upgrade');
  }
  
  // Diğer durumlar için "Plan Değiştir" yaz
  return t('Subscription:actions.changePlan');
};

/**
 * Düğme devre dışı durumunu belirle
 */
export const isButtonDisabled = (
  planType: SubscriptionPlanType, 
  subscription: ISubscriptionSummary | null
): boolean => {
  return Boolean(
    subscription?.plan === planType && 
    !subscription.isTrial && 
    subscription.isActive
  );
};
