
/**
 * Nakit hesap yönetimi servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount, CreateCashAccountData } from '../types';
import { StatementService } from '../../statementManagement/services/StatementService';

/**
 * Nakit hesapları yönetmek için servis
 */
export class CashAccountManagementService {
  private static logger = new ModuleLogger('CashAccountsNew.CashAccountManagementService');

  /**
   * Yeni bir nakit hesap oluşturur
   */
  static async createCashAccount(data: CreateCashAccountData): Promise<{
    success: boolean;
    data?: CashAccount;
    error?: string;
    statementId?: string;
  }> {
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
      let statementId;
      try {
        const newAccount = accountData as CashAccount;
        
        // Dönem tarihlerini hesapla
        const period = StatementService.calculateNextPeriod(newAccount);
        
        // İlk ekstreyi oluştur
        const statementResult = await StatementService.createNextStatement(
          newAccount.id,
          period.startDate,
          period.endDate
        );
        
        if (statementResult.success && statementResult.data) {
          statementId = statementResult.data.id;
          this.logger.info('Initial statement created automatically for new account', { 
            accountId: newAccount.id, 
            statementId: statementId
          });
        } else {
          this.logger.warn('Failed to create initial statement for new account', { 
            accountId: newAccount.id, 
            error: statementResult.error 
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
        data: accountData as CashAccount,
        statementId
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
   * ID'ye göre belirli bir nakit hesabı getirir
   */
  static async getCashAccountById(id: string): Promise<{
    success: boolean;
    data?: CashAccount;
    error?: string;
  }> {
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
