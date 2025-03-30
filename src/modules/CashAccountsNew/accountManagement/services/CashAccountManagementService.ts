
import { supabase } from '@/integrations/supabase/client';
import { CreateCashAccountRequest, CashAccountResponse } from '../types';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

/**
 * Nakit hesap yönetimi için servis sınıfı
 */
export class CashAccountManagementService {
  private static logger = LoggerService.getInstance('CashAccountManagementService');

  /**
   * Yeni bir nakit hesap oluşturur
   * @param data Nakit hesap verileri
   * @returns İşlem sonucu
   */
  public static async createCashAccount(data: CreateCashAccountRequest): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Creating cash account with data:', data);

      const { data: cashAccount, error } = await supabase
        .from('cash_accounts')
        .insert({
          name: data.name,
          initial_balance: data.initial_balance,
          currency: data.currency,
          description: data.description,
          closing_day_type: data.closing_day_type,
          closing_day_value: data.closing_day_value,
          account_type: 'Cash Account',
        })
        .select()
        .single();

      if (error) {
        this.logger.error('Error creating cash account:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      this.logger.debug('Cash account created successfully:', cashAccount);
      return {
        success: true,
        data: cashAccount,
      };
    } catch (error) {
      this.logger.error('Unexpected error creating cash account:', error);
      return {
        success: false,
        error: 'Unexpected error creating cash account',
      };
    }
  }
}
