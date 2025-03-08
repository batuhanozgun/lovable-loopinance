
import React, { ReactNode, useEffect } from 'react';
import { useSubscriptionState } from '../hooks/useSubscriptionState';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { useSubscriptionGuard } from '../hooks/useSubscriptionGuard';
import { SessionService } from '@/modules/UserManagement/auth';
import { SubscriptionLoadingView } from '../features/status/SubscriptionLoadingView';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useNavigate } from 'react-router-dom';

interface SubscriptionGuardProps {
  children: ReactNode;
}

const logger = LoggerService.getInstance("SubscriptionGuard");

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { subscription, isLoading } = useSubscriptionState();
  const { isActive, isExpired } = useSubscriptionStatus(subscription);
  const { guardNavigate } = useSubscriptionGuard(subscription);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUserAndSubscription = async () => {
      try {
        logger.debug("Kullanıcı ve abonelik kontrolü yapılıyor");
        
        // Kullanıcı var mı kontrol et
        const currentUser = await SessionService.getCurrentUser();
        
        if (!currentUser) {
          logger.debug("Kullanıcı bulunamadı, giriş sayfasına yönlendiriliyor");
          navigate('/login');
          return;
        }
        
        // Abonelik yüklenmişse durum kontrolü yap
        if (!isLoading && subscription) {
          guardNavigate();
        }
      } catch (error) {
        logger.error("Abonelik guard kontrolü sırasında hata", error);
      }
    };
    
    checkUserAndSubscription();
  }, [isLoading, subscription, navigate]);
  
  // Abonelik yükleniyorsa, yükleme ekranını göster
  if (isLoading) {
    return <SubscriptionLoadingView />;
  }
  
  // Abonelik süresi dolmuşsa
  if (isExpired) {
    // Yönlendirme useEffect içinde yapılıyor
    return <SubscriptionLoadingView />;
  }
  
  // Aktif abonelik - children'ı render et
  return <>{children}</>;
};
