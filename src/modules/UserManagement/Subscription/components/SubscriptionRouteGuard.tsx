
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscriptionLogger } from '../hooks/useSubscriptionLogger';

interface SubscriptionRouteGuardProps {
  children: ReactNode;
  canAccess: boolean;
  shouldRedirect: boolean;
  redirectPath?: string;
  userId?: string;
  subscription: any | null;
  isLoading: boolean;
  isActive: boolean;
  isExpired: boolean;
}

/**
 * Abonelik temelli rota koruma bileşeni
 */
export const SubscriptionRouteGuard: React.FC<SubscriptionRouteGuardProps> = ({
  children,
  canAccess,
  shouldRedirect,
  redirectPath,
  userId,
  subscription,
  isLoading,
  isActive,
  isExpired
}) => {
  const { logSubscriptionAccess } = useSubscriptionLogger(
    subscription,
    isLoading,
    isActive,
    isExpired,
    subscription?.id
  );

  if (shouldRedirect && redirectPath) {
    if (userId) {
      logSubscriptionAccess(userId, false);
    }
    return <Navigate to={redirectPath} replace />;
  }

  if (canAccess) {
    if (userId) {
      logSubscriptionAccess(userId, true);
    }
    return <>{children}</>;
  }

  // Varsayılan olarak abonelik sayfasına yönlendir
  return <Navigate to="/subscription/expired" replace />;
};
