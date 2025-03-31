import { Database } from '@/integrations/supabase/types';

/**
 * Nakit Hesap veri türü
 */
export type CashAccount = Database['public']['Tables']['cash_accounts']['Row'] & {
  current_balance?: number;
};

/**
 * Yeni Nakit Hesap oluşturma için tip
 */
export type CreateCashAccountData = Omit<
  Database['public']['Tables']['cash_accounts']['Insert'],
  'id' | 'created_at' | 'updated_at' | 'is_active'
>;

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
 * Nakit Hesap sıralama verisi
 */
export interface CashAccountOrder {
  id: string;
  sort_order: number;
}
