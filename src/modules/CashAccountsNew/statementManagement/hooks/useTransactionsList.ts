
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { AccountTransaction, TransactionFilters, StatementTransactionType } from '../types/transaction';
import { TransactionQueryService } from '../services/transaction/TransactionQueryService';
import { useQuery } from '@tanstack/react-query';

/**
 * İşlem listesi verilerini ve işlemlerini yönetmek için özel kanca
 */
export const useTransactionsList = (statementId: string | undefined) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [filteredTransactions, setFilteredTransactions] = useState<AccountTransaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    sortByDate: 'desc',
    sortByAmount: null
  });

  // TanStack Query kullanarak veri çekme işlemini gerçekleştir
  const {
    data: transactions = [],
    isLoading,
    refetch: queryRefetch,
    error
  } = useQuery({
    queryKey: ['statementTransactions', statementId],
    queryFn: async () => {
      if (!statementId) return [];
      
      const response = await TransactionQueryService.getTransactionsByStatementId(statementId);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'İşlemler getirilemedi');
    },
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching transactions:', err);
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t('errors.transaction.list.failed'),
          variant: 'destructive'
        });
      }
    }
  });

  // TanStack Query'nin refetch fonksiyonunu Promise<void> dönen bir fonksiyona çevirelim
  const refetch = useCallback(async (): Promise<void> => {
    try {
      await queryRefetch();
    } catch (error) {
      console.error('Error refetching transactions:', error);
    }
  }, [queryRefetch]);

  // Filtreler uygulandığında işlemleri filtrele
  useEffect(() => {
    if (transactions) {
      applyFilters(transactions, filters);
    }
  }, [filters, transactions]);

  // Filtreleme ve sıralama
  const applyFilters = (transactions: AccountTransaction[], filters: TransactionFilters) => {
    let filtered = [...transactions];

    // Tür filtresi
    if (filters.type !== 'all') {
      filtered = filtered.filter(transaction => transaction.transaction_type === filters.type);
    }

    // Tarih sıralaması
    if (filters.sortByDate) {
      filtered.sort((a, b) => {
        const dateA = new Date(`${a.transaction_date}T${a.transaction_time}`).getTime();
        const dateB = new Date(`${b.transaction_date}T${b.transaction_time}`).getTime();
        return filters.sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    // Tutar sıralaması
    if (filters.sortByAmount) {
      filtered.sort((a, b) => {
        return filters.sortByAmount === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      });
    }

    setFilteredTransactions(filtered);
  };

  // Türe göre filtreleme
  const filterByType = (type: StatementTransactionType | 'all') => {
    setFilters(prev => ({
      ...prev,
      type
    }));
  };

  // Tarihe göre sıralama
  const sortByDate = (direction: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortByDate: direction,
      sortByAmount: null
    }));
  };

  // Tutara göre sıralama
  const sortByAmount = (direction: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortByAmount: direction,
      sortByDate: null
    }));
  };

  // Filtre sıfırlama
  const resetFilters = () => {
    setFilters({
      type: 'all',
      sortByDate: 'desc',
      sortByAmount: null
    });
  };

  return {
    data: filteredTransactions,
    isLoading,
    filters,
    filterByType,
    sortByDate,
    sortByAmount,
    resetFilters,
    refetch,
    error
  };
};
