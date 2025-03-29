
import { supabase } from '@/integrations/supabase/client';
import { accountsLogger } from '../../../../logging';
import { 
  CashAccount, 
  CreateCashAccountData, 
  CashAccountResult,
  CashAccountListResult
} from '../../../../shared/types';

/**
 * Nakit Hesapları için Application Service sınıfı
 */
export class CashAccountService {
  /**
   * Kullanıcıya ait tüm nakit hesapları getirir
   */
  static async getCashAccounts(userId: string): Promise<CashAccountListResult> {
    try {
      accountsLogger.info('Fetching all cash accounts', { userId });
      
      const { data, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        accountsLogger.error('Error fetching cash accounts', error, { userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true,
        data: data as CashAccount[]
      };
    } catch (error) {
      accountsLogger.error('Unexpected error fetching cash accounts', error, { userId });
      return {
        success: false,
        error: 'Unexpected error fetching cash accounts'
      };
    }
  }
  
  /**
   * Belirli bir nakit hesabın detaylarını getirir
   */
  static async getCashAccount(accountId: string, userId: string): Promise<CashAccountResult> {
    try {
      accountsLogger.info('Fetching cash account details', { accountId, userId });
      
      const { data, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('id', accountId)
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();
      
      if (error) {
        accountsLogger.error('Error fetching cash account details', error, { accountId, userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true,
        data: data as CashAccount
      };
    } catch (error) {
      accountsLogger.error('Unexpected error fetching cash account details', error, { accountId, userId });
      return {
        success: false,
        error: 'Unexpected error fetching cash account details'
      };
    }
  }
  
  /**
   * Yeni bir nakit hesap oluşturur
   */
  static async createCashAccount(data: CreateCashAccountData): Promise<CashAccountResult> {
    try {
      accountsLogger.info('Creating new cash account', { accountName: data.name });
      
      const { data: newAccount, error } = await supabase
        .from('cash_accounts')
        .insert(data)
        .select('*')
        .single();
      
      if (error) {
        accountsLogger.error('Error creating cash account', error, { accountData: data });
        return {
          success: false,
          error: error.message
        };
      }
      
      accountsLogger.info('Cash account created successfully', { accountId: newAccount.id });
      return {
        success: true,
        data: newAccount as CashAccount
      };
    } catch (error) {
      accountsLogger.error('Unexpected error creating cash account', error, { accountData: data });
      return {
        success: false,
        error: 'Unexpected error creating cash account'
      };
    }
  }
  
  /**
   * Nakit hesabı günceller
   */
  static async updateCashAccount(accountId: string, userId: string, data: Partial<CashAccount>): Promise<CashAccountResult> {
    try {
      accountsLogger.info('Updating cash account', { accountId, userId });
      
      const { data: updatedAccount, error } = await supabase
        .from('cash_accounts')
        .update(data)
        .eq('id', accountId)
        .eq('user_id', userId)
        .select('*')
        .single();
      
      if (error) {
        accountsLogger.error('Error updating cash account', error, { accountId, userId, data });
        return {
          success: false,
          error: error.message
        };
      }
      
      accountsLogger.info('Cash account updated successfully', { accountId });
      return {
        success: true,
        data: updatedAccount as CashAccount
      };
    } catch (error) {
      accountsLogger.error('Unexpected error updating cash account', error, { accountId, userId, data });
      return {
        success: false,
        error: 'Unexpected error updating cash account'
      };
    }
  }
  
  /**
   * Nakit hesabı siler (soft delete)
   */
  static async deleteCashAccount(accountId: string, userId: string): Promise<CashAccountResult> {
    try {
      accountsLogger.info('Soft deleting cash account', { accountId, userId });
      
      const { data: deletedAccount, error } = await supabase
        .from('cash_accounts')
        .update({ is_active: false })
        .eq('id', accountId)
        .eq('user_id', userId)
        .select('*')
        .single();
      
      if (error) {
        accountsLogger.error('Error deleting cash account', error, { accountId, userId });
        return {
          success: false,
          error: error.message
        };
      }
      
      accountsLogger.info('Cash account deleted successfully', { accountId });
      return {
        success: true,
        data: deletedAccount as CashAccount
      };
    } catch (error) {
      accountsLogger.error('Unexpected error deleting cash account', error, { accountId, userId });
      return {
        success: false,
        error: 'Unexpected error deleting cash account'
      };
    }
  }
}

// Servis instance'ı export etmeyi kaldırıyoruz
// export const cashAccountService = new CashAccountService();
