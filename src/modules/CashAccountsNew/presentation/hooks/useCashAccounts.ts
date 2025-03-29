
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { cashAccountService } from '../../domains/accounts/application/services/CashAccountService';
import { uiLogger } from '../../logging';
import { useSessionUser } from '@/modules/Subscription/hooks/useSessionUser';
import { CashAccount } from '../../shared/types';

/**
 * Kullanıcının nakit hesaplarını getiren hook
 */
export const useCashAccounts = () => {
  const { user } = useSessionUser();
  const userId = user?.id;
  
  // Nakit hesapları getir
  const {
    data: accounts,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['cash-accounts', userId],
    queryFn: async () => {
      if (!userId) {
        uiLogger.warn('Attempting to fetch cash accounts without a user ID');
        return [];
      }
      
      const result = await cashAccountService.getCashAccounts(userId);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch cash accounts');
      }
      
      return result.data as CashAccount[];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 dakika
    gcTime: 10 * 60 * 1000 // 10 dakika
  });
  
  // Logla
  useEffect(() => {
    if (isError) {
      uiLogger.error('Error in useCashAccounts hook', error instanceof Error ? error : undefined);
    }
  }, [isError, error]);
  
  // Manuel yenileme fonksiyonu (useCallback ile memoize edilmiş)
  const refreshAccounts = useCallback(() => {
    uiLogger.info('Manual refresh of cash accounts requested');
    return refetch();
  }, [refetch]);
  
  return {
    data: accounts,
    isLoading,
    isError,
    error,
    refresh: refreshAccounts
  };
};
