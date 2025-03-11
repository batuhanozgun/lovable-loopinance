
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse, CreateCashAccountData } from '../types';
import { serviceLogger } from '../logging';
import { SingleAccountStatementService } from './statement/automation/checking/SingleAccountStatementService';

/**
 * Nakit Hesapları yönetmek için servis
 */
export class CashAccountService {
  private static logger = serviceLogger;
  private static singleAccountStatementService = new SingleAccountStatementService();

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
      
      // Hesap oluşturulduktan sonra ilk ekstreyi otomatik olarak oluştur
      try {
        const newAccount = accountData as CashAccount;
        const statementResult = await this.singleAccountStatementService.checkAndCreateStatementForAccount(newAccount);
        
        if (statementResult.success) {
          this.logger.info('Initial statement created automatically for new account', { 
            accountId: newAccount.id, 
            statementId: statementResult.statementId 
          });
        } else {
          this.logger.warn('Failed to create initial statement for new account', { 
            accountId: newAccount.id, 
            error: statementResult.message 
          });
        }
      } catch (statementError) {
        // Ekstre oluşturma hatası hesap oluşturmayı etkilememelidir
        this.logger.error('Error creating initial statement', { 
          accountId: accountData.id, 
          error: statementError 
        });
      }
      
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
