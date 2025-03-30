
import { supabase } from '@/integrations/supabase/client';
import { CashAccount, CashAccountResponse, CashAccountOrder } from '../types';

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
        .order('sort_order', { ascending: true });
      
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

  /**
   * Nakit hesapların sıralama değerlerini günceller
   */
  static async updateCashAccountOrder(accountOrders: CashAccountOrder[]): Promise<{success: boolean; error?: string}> {
    try {
      const promises = accountOrders.map(order => {
        return supabase
          .from('cash_accounts')
          .update({ sort_order: order.sort_order })
          .eq('id', order.id);
      });
      
      const results = await Promise.all(promises);
      
      // Hata kontrolü
      const errors = results
        .filter(result => result.error)
        .map(result => result.error?.message);
      
      if (errors.length > 0) {
        const errorMessage = `Hesap sıralaması güncellenirken hatalar oluştu: ${errors.join(', ')}`;
        return { 
          success: false,
          error: errorMessage
        };
      }
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
