
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
    
    // Eğer abonelik aktifse erişime izin ver
    if (subscription.isActive) {
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
