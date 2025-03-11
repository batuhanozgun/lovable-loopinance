
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse, CreateCashAccountData } from '../../types';
import { serviceLogger } from '../../logging';
import { AccountQueryService } from './query/AccountQueryService';

/**
 * Nakit Hesapları yönetmek için servis
 */
export class CashAccountService {
  private static logger = serviceLogger;

  /**
   * Yeni bir nakit hesap oluşturur
   */
  static async createCashAccount(data: CreateCashAccountData): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Creating new cash account', { data });
      
      const { data: accountData, error } = await supabase
        .from('cash_accounts')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create cash account', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Cash account created successfully', { id: accountData.id });
      return {
        success: true,
        data: accountData as CashAccount
      };
    } catch (error) {
      this.logger.error('Unexpected error creating cash account', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Kullanıcının tüm nakit hesaplarını getirir
   */
  static getUserCashAccounts = AccountQueryService.getUserCashAccounts;

  /**
   * ID'ye göre belirli bir nakit hesabı getirir
   */
  static getCashAccountById = AccountQueryService.getCashAccountById;
}
