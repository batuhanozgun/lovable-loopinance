
import { useMemo } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

const logger = LoggerService.getInstance("useSubscriptionGuard");

/**
 * Abonelik güvenlik kontrolü hook'u
 */
export const useSubscriptionGuard = (
  isLoading: boolean,
  isActive: boolean,
  isExpired: boolean,
  subscriptionId?: string
) => {
  return useMemo(() => {
    // Yükleme sırasında erişime izin verme
    if (isLoading) {
      return {
        canAccess: false,
        shouldRedirect: false,
        loading: true
      };
    }
    
    // Abonelik süresi dolmuşsa, yönlendirme
    if (isExpired) {
      logger.info("Kullanıcının abonelik süresi dolmuş, yönlendiriliyor", { subscriptionId });
      return {
        canAccess: false,
        shouldRedirect: true,
        redirectPath: '/subscription/expired',
        loading: false
      };
    }
    
    // Abonelik aktifse (trial veya active), erişime izin ver
    if (isActive) {
      return {
        canAccess: true,
        shouldRedirect: false,
        loading: false
      };
    }
    
    // Diğer durumlarda da abonelik sayfasına yönlendir
    logger.warn("Beklenmeyen abonelik durumu, yönlendiriliyor", { subscriptionId });
    return {
      canAccess: false,
      shouldRedirect: true,
      redirectPath: '/subscription/expired',
      loading: false
    };
  }, [isLoading, isActive, isExpired, subscriptionId]);
};
