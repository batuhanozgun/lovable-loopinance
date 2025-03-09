
import { useState, useEffect, useCallback } from 'react';
import { SessionService } from '@/modules/UserManagement/auth/services/SessionService';
import { subscriptionLogger } from '../logging';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

/**
 * Mevcut kullanıcı oturum bilgisini almak için hook
 */
export const useSessionUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const { t } = useTranslation(['Subscription', 'common']);
  const { toast } = useToast();

  // Kullanıcı kimliğini yeniden yükleme fonksiyonu
  const refreshUserSession = useCallback(async () => {
    try {
      setIsSessionLoading(true);
      subscriptionLogger.debug('Oturum bilgisi yeniden alınıyor');
      
      const sessionResponse = await SessionService.getCurrentSession();
      
      if (!sessionResponse.success || !sessionResponse.user) {
        const errorMsg = t('Subscription:errors.access.denied');
        subscriptionLogger.error('Oturum bilgisi alınamadı', { 
          error: sessionResponse.error || 'Kullanıcı bilgisi bulunamadı' 
        });
        setSessionError(errorMsg);
        setUserId(null);
      } else {
        subscriptionLogger.debug('Oturum bilgisi başarıyla alındı', { 
          userId: sessionResponse.user.id 
        });
        setUserId(sessionResponse.user.id);
        setSessionError(null);
      }
    } catch (error) {
      const errorMsg = t('Subscription:errors.session.error');
      subscriptionLogger.error('Oturum bilgisi yüklenirken beklenmeyen hata', error);
      setSessionError(errorMsg);
      setUserId(null);
    } finally {
      setIsSessionLoading(false);
    }
  }, [t]);

  // İlk yükleme ve komponent mount olduğunda çalış
  useEffect(() => {
    refreshUserSession();
  }, [refreshUserSession]);

  return { 
    userId, 
    isSessionLoading, 
    sessionError, 
    refreshUserSession 
  };
};
