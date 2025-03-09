
import { SubscriptionPlanType } from '../../../../types/ISubscription';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { useSubscriptionLocale } from './useSubscriptionLocale';

/**
 * Abonelik fiyatlandırması ile ilgili işlemleri sağlayan hook
 */
export const useSubscriptionPrice = () => {
  const { locale, currency, monthlyPrice, yearlyPrice } = useSubscriptionLocale();
  
  // Abonelik plan tipine göre fiyat hesapla
  const getPriceByPlan = (planType: SubscriptionPlanType) => {
    return planType === SubscriptionPlanType.YEARLY ? yearlyPrice : monthlyPrice;
  };
  
  // Tek ödeme tutarını hesapla (aylık veya yıllık)
  const getSinglePaymentAmount = (planType: SubscriptionPlanType) => {
    if (planType === SubscriptionPlanType.YEARLY) {
      return yearlyPrice * 12;
    }
    return monthlyPrice;
  };
  
  // Para birimi formatını uygula
  const formatPrice = (price: number) => {
    return formatCurrency(price, locale, currency);
  };
  
  return {
    getPriceByPlan,
    getSinglePaymentAmount,
    formatPrice,
    yearlyPrice,
    monthlyPrice
  };
};
