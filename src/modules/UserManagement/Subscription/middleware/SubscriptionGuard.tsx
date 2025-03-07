
import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

interface SubscriptionGuardProps {
  children: ReactNode;
}

const logger = LoggerService.getInstance("SubscriptionGuard");

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { isLoading, isActive, isExpired, subscription } = useSubscription();

  useEffect(() => {
    if (subscription) {
      logger.debug("Abonelik durumu kontrolü", {
        status: subscription.status,
        planType: subscription.plan_type
      });
    }
  }, [subscription]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">Abonelik bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Abonelik süresi dolmuşsa, "abonelik süresi doldu" sayfasına yönlendir
  if (isExpired) {
    logger.info("Kullanıcının abonelik süresi dolmuş, yönlendiriliyor");
    return <Navigate to="/subscription/expired" replace />;
  }

  // Abonelik aktifse (trial veya active), içeriği göster
  if (isActive) {
    return <>{children}</>;
  }

  // Diğer durumlarda (örn. cancelled) da abonelik sayfasına yönlendir
  logger.warn("Beklenmeyen abonelik durumu, yönlendiriliyor");
  return <Navigate to="/subscription/expired" replace />;
};
