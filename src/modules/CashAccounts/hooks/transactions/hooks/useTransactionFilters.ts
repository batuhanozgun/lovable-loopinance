
import { useState } from 'react';
import { TransactionFilterOptions } from '../types';
import { getDefaultFilters } from '../utils/filterUtils';

/**
 * İşlem filtrelerini yönetmek için hook
 */
export const useTransactionFilters = (initialFilters?: Partial<TransactionFilterOptions>) => {
  const [filters, setFilters] = useState<TransactionFilterOptions>({
    ...getDefaultFilters(),
    ...initialFilters,
  });

  /**
   * Tarihe göre sırala
   */
  const sortByDate = (order: 'asc' | 'desc' = 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'date',
      sortOrder: order,
    }));
  };

  /**
   * Tutara göre sırala
   */
  const sortByAmount = (order: 'asc' | 'desc' = 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'amount',
      sortOrder: order,
    }));
  };

  /**
   * Türe göre filtrele
   */
  const filterByType = (type: 'income' | 'expense' | 'all') => {
    setFilters(prev => ({
      ...prev,
      transactionType: type,
    }));
  };

  /**
   * Filtreleri sıfırla
   */
  const resetFilters = () => {
    setFilters(getDefaultFilters());
  };

  /**
   * Tüm filtreleri ayarla
   */
  const updateFilters = (newFilters: Partial<TransactionFilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  return {
    filters,
    setFilters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
    updateFilters,
  };
};
