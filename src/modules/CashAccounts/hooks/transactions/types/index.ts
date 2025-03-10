
import { AccountTransaction, TransactionType } from '../../../types';

/**
 * İşlem filtre seçenekleri
 */
export type TransactionFilterOptions = {
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  transactionType: 'income' | 'expense' | 'all';
};

/**
 * Hesap işlemleri için filtre seçenekleri
 */
export type AccountTransactionFilterOptions = TransactionFilterOptions & {
  limit?: number;
  startDate?: string;
  endDate?: string;
};
