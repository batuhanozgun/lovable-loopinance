import { Database } from '@/integrations/supabase/types';

/**
 * Nakit Hesap veri türü
 */
export type CashAccount = Database['public']['Tables']['cash_accounts']['Row'];

/**
 * Yeni Nakit Hesap oluşturma için tip
 */
export type CreateCashAccountData = Omit<
  Database['public']['Tables']['cash_accounts']['Insert'],
  'id' | 'created_at' | 'updated_at' | 'is_active'
>;

/**
 * Nakit Hesap Form verisi türü
 */
export interface CashAccountFormData {
  name: string;
  initialBalance: {
    whole: string;
    decimal: string;
  };
  currency: CurrencyType;
  description?: string;
  closingDayType: ClosingDayType;
  closingDayValue?: number;
}

/**
 * Hesap dönem kapanış günü türleri
 */
export enum ClosingDayType {
  LAST_DAY = 'LAST_DAY',
  LAST_BUSINESS_DAY = 'LAST_BUSINESS_DAY',
  SPECIFIC_DAY = 'SPECIFIC_DAY'
}

/**
 * Para birimi türleri
 */
export enum CurrencyType {
  TRY = 'TRY',
  USD = 'USD',
  EUR = 'EUR'
}

/**
 * Nakit Hesap servis işlem sonucu
 */
export interface CashAccountResponse {
  success: boolean;
  data?: CashAccount | CashAccount[];
  error?: string;
}

/**
 * Hesap ekstresi veri türü
 */
export type AccountStatement = Database['public']['Tables']['account_statements']['Row'];

/**
 * Yeni hesap ekstresi oluşturma için tip
 */
export type CreateAccountStatementData = Omit<
  Database['public']['Tables']['account_statements']['Insert'],
  'id' | 'created_at' | 'updated_at' | 'income' | 'expenses'
>;

/**
 * Hesap ekstresi durum türü
 */
export enum StatementStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PENDING = 'pending',
  FUTURE = 'future'
}

/**
 * Hesap ekstresi servis işlem sonucu
 */
export interface AccountStatementResponse {
  success: boolean;
  data?: AccountStatement | AccountStatement[];
  error?: string;
}

/**
 * Hesap işlemi veri türü
 */
export type AccountTransaction = Database['public']['Tables']['account_transactions']['Row'];

/**
 * Yeni hesap işlemi oluşturma için tip
 */
export type CreateAccountTransactionData = Omit<
  Database['public']['Tables']['account_transactions']['Insert'],
  'id' | 'created_at' | 'updated_at'
>;

/**
 * İşlem türü
 */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

/**
 * Hesap işlemi servis işlem sonucu
 */
export interface AccountTransactionResponse {
  success: boolean;
  data?: AccountTransaction | AccountTransaction[];
  error?: string;
}
