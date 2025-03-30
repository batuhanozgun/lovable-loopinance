
/**
 * Ekstre Yönetim Modülü tip tanımlamaları
 */

import { Database } from '@/integrations/supabase/types';

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
 * Tek bir ekstre yanıtı için tip tanımı
 */
export interface SingleStatementResponse {
  success: boolean;
  data?: AccountStatement | null;
  error?: string;
}

/**
 * Ekstre listesi yanıtı için tip tanımı
 */
export interface StatementListResponse {
  success: boolean;
  data?: AccountStatement[];
  error?: string;
}

/**
 * Ekstre kontrol işlemi sonuç tipi
 */
export interface StatementCheckResult {
  success: boolean;
  message?: string;
  statementId?: string;
  isNew?: boolean;
}

/**
 * Ekstre dönem işlemi sonuç tipi
 */
export interface StatementPeriodResult {
  startDate: Date;
  endDate: Date;
}
