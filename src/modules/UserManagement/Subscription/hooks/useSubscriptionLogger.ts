
import { useEffect } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { ISubscription } from '../types/ISubscription';

const logger = LoggerService.getInstance("SubscriptionLogger");

/**
 * Abonelik loglama hook'u
 */
export const useSubscriptionLogger = (
  subscription: ISubscription | null,
  isLoading: boolean,
  isActive: boolean,
  isExpired: boolean,
  subscriptionId?: string
) => {
  useEffect(() => {
    if (subscription) {
      logger.debug("Abonelik durumu kontrolü", {
        status: subscription.status,
        planType: subscription.plan_type
      });
    }
  }, [subscription]);

  useEffect(() => {
    if (!isLoading) {
      if (isExpired && subscriptionId) {
        logger.info("Kullanıcının abonelik süresi dolmuş", { subscriptionId });
      } else if (isActive && subscriptionId) {
        logger.debug("Kullanıcı aktif aboneliğe sahip", { subscriptionId });
      }
    }
  }, [isLoading, isActive, isExpired, subscriptionId]);

  return {
    logSubscriptionAccess: (userId: string, allowed: boolean) => {
      if (allowed) {
        logger.info("Kullanıcı içeriğe erişim sağladı", { userId });
      } else {
        logger.warn("Kullanıcı abonelik gerektiren içeriğe erişmeye çalıştı fakat reddedildi", { userId });
      }
    }
  };
};
