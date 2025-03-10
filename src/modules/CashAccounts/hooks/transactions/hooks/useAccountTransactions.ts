
import { useQuery } from '@tanstack/react-query';
import { AccountTransaction } from '../../../types';
import { TransactionService } from '../../../services/transaction';
import { useTransactionErrors } from '../utils/errorUtils';
import { useState } from 'react';
import { AccountTransactionFilterOptions } from '../types';
import { getDefaultAccountFilters } from '../utils/filterUtils';

/**
 * Belirli bir hesabın işlemlerini getiren hook
 */
export const useAccountTransactions = (
  accountId: string | undefined,
  options: {
    limit?: number;
    startDate?: string;
    endDate?: string;
  } = {}
) => {
  const { showErrorToast } = useTransactionErrors();
  const [filters, setFilters] = useState<AccountTransactionFilterOptions>(
    getDefaultAccountFilters(options)
  );

  const query = useQuery({
    queryKey: ['accountTransactions', accountId, filters],
    enabled: !!accountId,
    queryFn: async (): Promise<AccountTransaction[]> => {
      if (!accountId) return [];
      
      const response = await TransactionService.getTransactionsByAccountId(
        accountId,
        filters
      );
      
      if (!response.success) {
        showErrorToast(response.error);
        return [];
      }
      
      return response.data || [];
    }
  });

  return {
    ...query,
    filters,
    setFilters,
  };
};
