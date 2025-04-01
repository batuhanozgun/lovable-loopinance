
/**
 * İşlem Yönetimi için tip tanımlamaları
 */
import { CurrencyType } from '../../cashAccountHomepage/types';

/**
 * İşlem türü enum'u
 */
export enum StatementTransactionType {
  INCOME = "income",
  EXPENSE = "expense"
}

/**
 * İşlem tipi
 */
export interface AccountTransaction {
  id: string;
  account_id: string;
  statement_id: string;
  amount: number;
  transaction_type: StatementTransactionType;
  transaction_date: string;
  transaction_time: string;
  description?: string;
  category_id?: string;
  subcategory_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * İşlem liste yanıtı tipi
 */
export interface TransactionListResponse {
  success: boolean;
  data?: AccountTransaction[];
  error?: string;
}

/**
 * Tek işlem yanıtı tipi
 */
export interface SingleTransactionResponse {
  success: boolean;
  data?: AccountTransaction;
  error?: string;
}

/**
 * İşlem filtre durumu
 */
export interface TransactionFilters {
  type: StatementTransactionType | 'all';
  sortByDate: 'asc' | 'desc' | null;
  sortByAmount: 'asc' | 'desc' | null;
}
