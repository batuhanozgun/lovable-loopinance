
import { TransactionFilterOptions, AccountTransactionFilterOptions } from '../types';

/**
 * Varsayılan işlem filtre değerlerini döndürür
 */
export const getDefaultFilters = (): TransactionFilterOptions => ({
  sortBy: 'date',
  sortOrder: 'desc',
  transactionType: 'all',
});

/**
 * Varsayılan hesap işlem filtre değerlerini döndürür
 */
export const getDefaultAccountFilters = (options?: Partial<AccountTransactionFilterOptions>): AccountTransactionFilterOptions => ({
  ...getDefaultFilters(),
  ...options,
});
