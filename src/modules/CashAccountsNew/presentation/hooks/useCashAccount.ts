
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { cashAccountService } from '../../domains/accounts/application/services/CashAccountService';
import { uiLogger } from '../../logging';
import { useSessionUser } from '@/modules/Subscription/hooks/useSessionUser';
import { CashAccount } from '../../shared/types';

/**
 * Belirli bir nakit hesabı getiren hook
 */
export const useCashAccount = (accountId: string | undefined) => {
  const { user } = useSessionUser();
  const userId = user?.id;
  
  // Nakit hesabı getir
  const {
    data: account,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['cash-account', accountId, userId],
    queryFn: async () => {
      if (!accountId || !userId) {
        uiLogger.warn('Attempting to fetch cash account without accountId or userId', { accountId, userId });
        return null;
      }
      
      const result = await cashAccountService.getCashAccount(accountId, userId);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch cash account');
      }
      
      return result.data as CashAccount;
    },
    enabled: !!accountId && !!userId,
    staleTime: 5 * 60 * 1000, // 5 dakika
    gcTime: 10 * 60 * 1000 // 10 dakika
  });
  
  // Logla
  useEffect(() => {
    if (isError) {
      uiLogger.error('Error in useCashAccount hook', error instanceof Error ? error : undefined, { accountId });
    }
  }, [isError, error, accountId]);
  
  // Manuel yenileme fonksiyonu (useCallback ile memoize edilmiş)
  const refreshAccount = useCallback(() => {
    uiLogger.info('Manual refresh of cash account requested', { accountId });
    return refetch();
  }, [refetch, accountId]);
  
  return {
    data: account,
    isLoading,
    isError,
    error,
    refresh: refreshAccount
  };
};
