
import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscriptionState } from '../hooks/useSubscriptionState';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { useSubscriptionGuard } from '../hooks/useSubscriptionGuard';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

interface SubscriptionGuardProps {
  children: ReactNode;
}

const logger = LoggerService.getInstance("SubscriptionGuard");

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { subscription, isLoading } = useSubscriptionState();
  const { isActive, isExpired } = useSubscriptionStatus(subscription);
  const { canAccess, shouldRedirect, redirectPath, loading } = useSubscriptionGuard(
    isLoading,
    isActive,
    isExpired,
    subscription?.id
  );

  useEffect(() => {
    if (subscription) {
      logger.debug("Abonelik durumu kontrolü", {
        status: subscription.status,
        planType: subscription.plan_type
      });
    }
  }, [subscription]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">Abonelik bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (shouldRedirect && redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  if (canAccess) {
    return <>{children}</>;
  }

  // Varsayılan olarak abonelik sayfasına yönlendir
  return <Navigate to="/subscription/expired" replace />;
};
