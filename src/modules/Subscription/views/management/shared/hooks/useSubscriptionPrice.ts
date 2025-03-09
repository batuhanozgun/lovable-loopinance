
import { SubscriptionPlanType } from "../../../../types/ISubscription";
import { useSubscriptionLocale } from "./useSubscriptionLocale";

/**
 * Abonelik fiyatlarını döndüren hook
 */
export const useSubscriptionPrice = () => {
  const { isTurkish } = useSubscriptionLocale();
  
  // Standart plan fiyatları - dilin Türkçe olup olmadığına göre
  const monthlyPrice = isTurkish ? 49 : 4.99;
  const yearlyPrice = isTurkish ? 39 : 3.99;
  const yearlyDiscount = 20; // % cinsinden
  
  // Yıllık toplam fiyat (aylık fiyat * 12)
  const yearlyTotalPrice = yearlyPrice * 12;
  
  /**
   * Plan tipine göre fiyat döndür
   */
  const getPriceByPlan = (planType: SubscriptionPlanType): number => {
    switch (planType) {
      case SubscriptionPlanType.MONTHLY:
        return monthlyPrice;
      case SubscriptionPlanType.YEARLY:
        return yearlyPrice;
      default:
        return 0;
    }
  };
  
  return {
    monthlyPrice,
    yearlyPrice,
    yearlyTotalPrice,
    yearlyDiscount,
    getPriceByPlan
  };
};
