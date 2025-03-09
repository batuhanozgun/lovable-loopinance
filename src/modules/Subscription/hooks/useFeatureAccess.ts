
import { useCallback } from 'react';
import { useSubscriptionQuery } from './useSubscriptionQuery';
import { subscriptionLogger } from '../logging';

/**
 * Aboneliğe göre özellik erişimini kontrol eden hook
 */
export const useFeatureAccess = () => {
  const { subscription, isLoading, error } = useSubscriptionQuery();
  
  // Kullanıcının belirli bir özelliğe erişiminin olup olmadığını kontrol et
  const isFeatureAccessible = useCallback(() => {
    // Veri yükleniyorsa veya hata varsa erişimi engelleme
    if (isLoading || error) return true;
    
    // Abonelik bilgisi yoksa erişime izin ver (güvenli mod)
    if (!subscription) return true;
    
    // Eğer abonelik aktifse ve deneme süresi değilse erişime izin ver
    if (subscription.isActive && !subscription.isTrial) {
      return true;
    }
    
    // Eğer deneme süresi ise ve süresi dolmadıysa erişime izin ver
    if (subscription.isTrial && subscription.isActive) {
      return true;
    }
    
    // Abonelik süresi dolduysa erişimi kısıtla
    return false;
  }, [isLoading, error, subscription]);

  return {
    isFeatureAccessible,
    subscription,
    isLoading,
    error
  };
};
