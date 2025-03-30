
import { CurrencyType } from '../../cashAccountHomepage/types';

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
}

/**
 * Nakit hesap oluşturma servisi yanıt tipi
 */
export interface CashAccountResponse {
  success: boolean;
  data?: any;
  error?: string;
}
