
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse } from '../types';

/**
 * Nakit Hesapları yönetmek için servis
 */
export class CashAccountService {
  /**
   * Kullanıcının tüm nakit hesaplarını getirir
   */
  static async getUserCashAccounts(): Promise<CashAccountResponse> {
    try {
      const { data: accounts, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true,
        data: accounts as CashAccount[]
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
