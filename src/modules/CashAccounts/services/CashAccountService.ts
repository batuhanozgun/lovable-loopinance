
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse, CreateCashAccountData } from '../types';
import { serviceLogger } from '../logging';

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
  static async getUserCashAccounts(): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Fetching user cash accounts');
      
      const { data: accounts, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch cash accounts', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Cash accounts fetched successfully', { count: accounts.length });
      return {
        success: true,
        data: accounts as CashAccount[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching cash accounts', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
