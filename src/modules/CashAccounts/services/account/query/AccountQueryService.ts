
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse, CurrencyType } from '../../../types';
import { serviceLogger } from '../../../logging';
import { AccountQueryFilters } from './AccountQueryFilters';

/**
 * Nakit hesap sorgulama işlemleri için servis
 */
export class AccountQueryService {
  private static logger = serviceLogger;

  /**
   * Kullanıcının tüm nakit hesaplarını getirir
   */
  static async getUserCashAccounts(
    options: {
      onlyActive?: boolean,
      currency?: CurrencyType | 'all',
      sortBy?: 'name' | 'balance' | 'date',
      sortOrder?: 'asc' | 'desc'
    } = {}
  ): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Fetching user cash accounts', { options });
      
      const {
        onlyActive = true,
        currency = 'all',
        sortBy = 'date',
        sortOrder = 'desc'
      } = options;

      let query = supabase.from('cash_accounts').select('*');
      
      // Filtreleri uygula
      query = AccountQueryFilters.applyActiveFilter(query, onlyActive);
      query = AccountQueryFilters.applyCurrencyFilter(query, currency);
      query = AccountQueryFilters.applySortingFilter(query, sortBy, sortOrder);
      
      const { data: accounts, error } = await query;
      
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

  /**
   * ID'ye göre belirli bir nakit hesabı getirir
   */
  static async getCashAccountById(id: string): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Fetching cash account by ID', { id });
      
      const { data: account, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        this.logger.error('Failed to fetch cash account by ID', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Cash account fetched successfully', { id });
      return {
        success: true,
        data: account as CashAccount
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching cash account by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
