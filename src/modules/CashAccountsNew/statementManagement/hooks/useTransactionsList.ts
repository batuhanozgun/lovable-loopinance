
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { AccountTransaction, TransactionFilters, TransactionType } from '../types/transaction';
import { TransactionQueryService } from '../services/transaction/TransactionQueryService';

/**
 * İşlem listesi verilerini ve işlemlerini yönetmek için özel kanca
 */
export const useTransactionsList = (statementId: string | undefined) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<AccountTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    sortByDate: 'desc',
    sortByAmount: null
  });

  // İşlemleri çekme
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!statementId) {
        setTransactions([]);
        setFilteredTransactions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await TransactionQueryService.getTransactionsByStatementId(statementId);
        
        if (response.success && response.data) {
          setTransactions(response.data);
          applyFilters(response.data, filters);
        } else {
          toast({
            title: t('common:error', { ns: 'common' }),
            description: t('errors.transaction.list.failed'),
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t('errors.transaction.list.failed'),
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [statementId, t, toast]);

  // Filtreler uygulandığında işlemleri filtrele
  useEffect(() => {
    applyFilters(transactions, filters);
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
  const filterByType = (type: TransactionType | 'all') => {
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
