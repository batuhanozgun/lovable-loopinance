
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { AccountTransaction, TransactionFilters, StatementTransactionType } from '../types/transaction';
import { TransactionQueryService } from '../services/transaction/TransactionQueryService';

/**
 * İşlem listesi verilerini ve işlemlerini yönetmek için özel kanca
 */
export const useTransactionsList = (statementId: string | undefined) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    sortByDate: 'desc',
    sortByAmount: null
  });

  // React Query ile işlemleri çekme
  const {
    data: transactions = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['statementTransactions', statementId],
    queryFn: async () => {
      if (!statementId) {
        return [];
      }

      const response = await TransactionQueryService.getTransactionsByStatementId(statementId);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || t('errors.transaction.list.failed'));
      }
    },
    enabled: !!statementId
  });

  // Hata durumunda toast göster
  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({
        title: t('common:error', { ns: 'common' }),
        description: error.message,
        variant: 'destructive'
      });
    }
  }, [isError, error, toast, t]);

  // Filtrelenmiş işlemleri hesapla
  const filteredTransactions = (() => {
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

    return filtered;
  })();

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
    resetFilters
  };
};
