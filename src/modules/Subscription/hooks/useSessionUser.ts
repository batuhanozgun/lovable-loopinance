
import { useState, useEffect } from 'react';
import { SessionService } from '@/modules/UserManagement/auth/services/SessionService';
import { subscriptionLogger } from '../logging';
import { useTranslation } from 'react-i18next';

/**
 * Mevcut kullanıcı oturum bilgisini almak için hook
 */
export const useSessionUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const { t } = useTranslation(['Subscription', 'common']);

  useEffect(() => {
    const getSessionUser = async () => {
      try {
        setIsSessionLoading(true);
        const sessionResponse = await SessionService.getCurrentSession();
        
        if (!sessionResponse.success || !sessionResponse.user) {
          setSessionError(t('Subscription:errors.access.denied'));
          setUserId(null);
        } else {
          setUserId(sessionResponse.user.id);
          setSessionError(null);
        }
      } catch (error) {
        subscriptionLogger.error('Oturum bilgisi yüklenirken hata oluştu', error);
        setSessionError(t('Subscription:errors.session.error'));
      } finally {
        setIsSessionLoading(false);
      }
    };

    getSessionUser();
  }, [t]);

  return { userId, isSessionLoading, sessionError };
};
