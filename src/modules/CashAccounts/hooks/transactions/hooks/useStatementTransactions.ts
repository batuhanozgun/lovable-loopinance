
import { useQuery } from '@tanstack/react-query';
import { AccountTransaction } from '../../../types';
import { TransactionService } from '../../../services/transaction';
import { useTransactionFilters } from './useTransactionFilters';
import { useTransactionErrors } from '../utils/errorUtils';

/**
 * Belirli bir ekstrenin işlemlerini getiren hook
 */
export const useStatementTransactions = (statementId: string | undefined) => {
  const { showErrorToast } = useTransactionErrors();
  const {
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
  } = useTransactionFilters();

  const query = useQuery({
    queryKey: ['statementTransactions', statementId, filters],
    enabled: !!statementId,
    queryFn: async (): Promise<AccountTransaction[]> => {
      if (!statementId) return [];
      
      const response = await TransactionService.getTransactionsByStatementId(
        statementId,
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
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
  };
};
