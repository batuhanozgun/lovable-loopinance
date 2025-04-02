
/**
 * İşlem yönetimi için tip tanımlamaları
 */

import { CurrencyType } from "../../cashAccountHomepage/types";

/**
 * İşlem türü enum'u
 */
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense"
}

/**
 * İşlem oluşturma verisi tipi
 */
export interface CreateTransactionData {
  account_id: string;
  statement_id: string;
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  transaction_time: string;
  description?: string;
  category_id?: string;
  subcategory_id?: string;
}

/**
 * İşlem tipi
 */
export interface Transaction {
  id: string;
  account_id: string;
  statement_id: string;
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  transaction_time: string;
  description?: string;
  category_id?: string;
  subcategory_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * İşlem formu veri tipi
 */
export interface TransactionFormData {
  amount: string;
  transactionType: TransactionType;
  transactionDate: Date;
  transactionTime: {
    hour: string;
    minute: string;
  };
  description?: string;
  categoryId: string;
  subcategoryId?: string;
}

/**
 * İşlem yanıtı tipi - TransactionResponse olarak yeniden adlandırıldı çakışmayı önlemek için
 */
export interface TransactionResponse {
  success: boolean;
  data?: Transaction | null;
  error?: string;
}

/**
 * İşlem form bileşeni prop tipi
 */
export interface TransactionFormProps {
  statementId: string;
  accountId: string;
  currency: CurrencyType;
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
}
