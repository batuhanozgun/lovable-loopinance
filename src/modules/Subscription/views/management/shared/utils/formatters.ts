
import { ISubscriptionSummary } from '../../../../types/ISubscription';

/**
 * Aboneliğin yenileme tarihini biçimlendirir
 * @param subscription Abonelik bilgisi
 * @param locale Dil kodu
 */
export const formatRenewalDate = (subscription: ISubscriptionSummary | null, locale: string): string => {
  if (!subscription || !subscription.expiresAt) return '';
  
  const date = new Date(subscription.expiresAt);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Herhangi bir tarihi biçimlendirir
 * @param date Tarih nesnesi
 * @param locale Dil kodu
 */
export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
