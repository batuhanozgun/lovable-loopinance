
import { SubscriptionPlanType } from "../../../../types/ISubscription";

/**
 * Abonelik planı ismini formatlar ve çevirir
 * @param plan Plan tipi
 * @param t Çeviri fonksiyonu
 */
export const formatPlanName = (plan: SubscriptionPlanType, t: any): string => {
  return t(`Subscription:plan.${plan}`);
};

/**
 * Fiyatı formatlar
 * @param price Fiyat
 * @param locale Dil kodu
 * @param currency Para birimi
 */
export const formatPrice = (price: number, locale: string, currency: string): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Tarihi formatlar
 * @param date Tarih
 * @param locale Dil kodu
 */
export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
