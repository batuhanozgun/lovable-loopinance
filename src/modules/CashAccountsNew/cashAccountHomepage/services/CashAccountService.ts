
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
      // Nakit hesapları getir
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
      
      // Hesaplar için güncel ekstre bakiyelerini getir
      const accountsWithCurrentBalance = await this.attachCurrentStatementBalances(accounts as CashAccount[]);
      
      return {
        success: true,
        data: accountsWithCurrentBalance
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

  /**
   * Hesaplar listesine güncel ekstre bakiyelerini ekler
   * @private
   */
  private static async attachCurrentStatementBalances(accounts: CashAccount[]): Promise<CashAccount[]> {
    try {
      if (!accounts || accounts.length === 0) {
        return accounts;
      }

      // Tüm hesap ID'lerini içeren liste oluştur
      const accountIds = accounts.map(account => account.id);

      // Açık olan en güncel ekstreleri getir
      const { data: statements, error } = await supabase
        .from('cash_account_statements')
        .select('account_id, end_balance')
        .eq('status', 'OPEN')
        .in('account_id', accountIds)
        .order('start_date', { ascending: false });

      if (error || !statements) {
        console.error('Ekstre bakiyeleri getirilemedi:', error);
        return accounts;
      }

      // Her hesap için güncel bakiyeyi belirle
      return accounts.map(account => {
        // Bu hesaba ait en güncel ekstrenin bakiyesini bul
        const accountStatements = statements.filter(stmt => stmt.account_id === account.id);
        const currentBalance = accountStatements.length > 0 
          ? accountStatements[0].end_balance 
          : account.initial_balance;

        // Hesaba current_balance özelliğini ekle
        return {
          ...account,
          current_balance: currentBalance
        };
      });
    } catch (error) {
      console.error('Güncel ekstre bakiyeleri eklenirken hata oluştu:', error);
      return accounts;
    }
  }
}
