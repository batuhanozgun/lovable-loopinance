
import { CurrencyType } from '../../cashAccountHomepage/types';
import { Database } from '@/integrations/supabase/types';

/**
 * Kapanış günü tipleri
 */
export enum ClosingDayType {
  LAST_DAY = 'lastDay',
  LAST_BUSINESS_DAY = 'lastBusinessDay',
  SPECIFIC_DAY = 'specificDay'
}

/**
 * Nakit hesap oluşturma formu değerleri
 */
export interface CashAccountFormValues {
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
 * Hesap oluşturma API isteği için veri tipi
 */
export interface CreateCashAccountRequest {
  name: string;
  initial_balance: number;
  currency: CurrencyType;
  description?: string;
  closing_day_type: string;
  closing_day_value?: number;
  user_id: string; // Eklenen user_id alanı
}

/**
 * Nakit hesap oluşturma servisi yanıt tipi
 */
export interface CashAccountResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Nakit Hesap veri türü - AccountManagement modülü içinde bağımsız olarak tanımlanmıştır
 */
export type CashAccount = Database['public']['Tables']['cash_accounts']['Row'];

/**
 * Yeni Nakit Hesap oluşturma için tip - AccountManagement modülü içinde bağımsız olarak tanımlanmıştır
 */
export type CreateCashAccountData = Omit<
  Database['public']['Tables']['cash_accounts']['Insert'],
  'id' | 'created_at' | 'updated_at' | 'is_active'
>;
