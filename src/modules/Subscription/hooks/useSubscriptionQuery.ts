
import { useState, useEffect, useCallback } from 'react';
import { SubscriptionSummaryService } from '../services';
import { ISubscriptionSummary } from '../types/ISubscription';
import { useSessionUser } from './useSessionUser';
import { subscriptionLogger } from '../logging';
import { useTranslation } from 'react-i18next';

/**
 * Kullanıcının abonelik bilgilerini getirmek ve izlemek için hook
 */
export const useSubscriptionQuery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionSummary, setSubscriptionSummary] = useState<ISubscriptionSummary | null>(null);
  const { userId, isSessionLoading, sessionError } = useSessionUser();
  const { t } = useTranslation(['Subscription', 'common']);

  // Abonelik bilgilerini getir
  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Kullanıcı oturumu yoksa veya hata varsa çık
      if (sessionError || isSessionLoading || !userId) {
        setError(sessionError || t('Subscription:errors.access.denied'));
        setIsLoading(false);
        return;
      }
      
      const summary = await SubscriptionSummaryService.getSubscriptionSummary(userId);
      
      if (!summary) {
        setError(t('Subscription:errors.fetch.notFound'));
      } else {
        setSubscriptionSummary(summary);
      }
    } catch (error) {
      subscriptionLogger.error('Abonelik bilgisi yüklenirken hata oluştu', error);
      setError(t('Subscription:errors.fetch.general'));
    } finally {
      setIsLoading(false);
    }
  }, [t, userId, sessionError, isSessionLoading]);

  // İlk yüklemede abonelik bilgisini getir
  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);
  
  return {
    isLoading: isLoading || isSessionLoading,
    error: error || sessionError,
    subscription: subscriptionSummary,
    refreshSubscription: fetchSubscription
  };
};
