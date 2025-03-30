
/**
 * Ekstre Yönetimi için tip tanımlamaları
 */
import { Database } from '@/integrations/supabase/types';

/**
 * Ekstre durumu
 */
export enum StatementStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FUTURE = 'FUTURE'
}

/**
 * Ekstre veri türü
 */
export type AccountStatement = Database['public']['Tables']['account_statements']['Row'];

/**
 * Yeni ekstre oluşturma için veri türü
 */
export type CreateAccountStatementData = Omit<
  Database['public']['Tables']['account_statements']['Insert'],
  'id' | 'created_at' | 'updated_at' | 'income' | 'expenses'
>;

/**
 * Tek ekstre yanıt tipi
 */
export interface SingleStatementResponse {
  success: boolean;
  data?: AccountStatement | null;
  error?: string;
}

/**
 * Ekstre listesi yanıt tipi
 */
export interface StatementListResponse {
  success: boolean;
  data?: AccountStatement[];
  error?: string;
}

/**
 * Ekstre işleme sonucu
 */
export interface StatementCheckResult {
  success: boolean;
  message: string;
  statementId?: string;
  isNew?: boolean;
}
