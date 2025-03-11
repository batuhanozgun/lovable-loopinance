
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TransactionService } from '../services/transaction';
import { AccountTransaction, TransactionType } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type TransactionFilterOptions = {
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  transactionType: 'income' | 'expense' | 'all';
};

/**
 * Belirli bir ekstrenin işlemlerini getiren hook
 */
export const useTransactions = (statementId: string | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const [filters, setFilters] = useState<TransactionFilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc',
    transactionType: 'all',
  });

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
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.list.failed'),
        });
        return [];
      }
      
      return response.data || [];
    }
  });

  /**
   * Sort transactions by date
   */
  const sortByDate = (order: 'asc' | 'desc' = 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'date',
      sortOrder: order,
    }));
  };

  /**
   * Sort transactions by amount
   */
  const sortByAmount = (order: 'asc' | 'desc' = 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'amount',
      sortOrder: order,
    }));
  };

  /**
   * Filter transactions by type
   */
  const filterByType = (type: 'income' | 'expense' | 'all') => {
    setFilters(prev => ({
      ...prev,
      transactionType: type,
    }));
  };

  /**
   * Reset all filters to default
   */
  const resetFilters = () => {
    setFilters({
      sortBy: 'date',
      sortOrder: 'desc',
      transactionType: 'all',
    });
  };

  return {
    ...query,
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
  };
};

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
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const [filters, setFilters] = useState<TransactionFilterOptions & {
    limit?: number;
    startDate?: string;
    endDate?: string;
  }>({
    sortBy: 'date',
    sortOrder: 'desc',
    transactionType: 'all',
    ...options,
  });

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
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.list.failed'),
        });
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
