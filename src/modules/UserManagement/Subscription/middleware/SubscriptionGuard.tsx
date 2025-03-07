
import React, { ReactNode, useEffect } from 'react';
import { useSubscriptionState } from '../hooks/useSubscriptionState';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { useSubscriptionGuard } from '../hooks/useSubscriptionGuard';
import { SessionService } from '@/modules/UserManagement/auth';
import { SubscriptionLoadingView } from '../components/SubscriptionLoadingView';
import { SubscriptionRouteGuard } from '../components/SubscriptionRouteGuard';
import { useState } from 'react';

interface SubscriptionGuardProps {
  children: ReactNode;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { subscription, isLoading } = useSubscriptionState();
  const { isActive, isExpired } = useSubscriptionStatus(subscription);
  const { canAccess, shouldRedirect, redirectPath, loading } = useSubscriptionGuard(
    isLoading,
    isActive,
    isExpired,
    subscription?.id
  );
  const [userId, setUserId] = useState<string>("");
  
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await SessionService.getCurrentUser();
        if (user?.id) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error("Kullanıcı bilgisi alınamadı", error);
      }
    };
    
    getUserId();
  }, []);

  if (loading) {
    return <SubscriptionLoadingView />;
  }

  return (
    <SubscriptionRouteGuard
      canAccess={canAccess}
      shouldRedirect={shouldRedirect}
      redirectPath={redirectPath}
      userId={userId}
      subscription={subscription}
      isLoading={isLoading}
      isActive={isActive}
      isExpired={isExpired}
    >
      {children}
    </SubscriptionRouteGuard>
  );
};
