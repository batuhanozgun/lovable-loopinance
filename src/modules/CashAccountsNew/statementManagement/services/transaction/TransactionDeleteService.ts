
/**
 * İşlem silme servisi
 * Hesap ekstrelerindeki işlemleri silmek için kullanılır
 */
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SingleTransactionResponse } from '../../types/transaction';

export class TransactionDeleteService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionDeleteService');

  /**
   * Belirtilen ID'ye sahip işlemi siler
   * @param id Silinecek işlem ID'si
   * @returns İşlemin başarılı olup olmadığını belirten yanıt
   */
  static async deleteTransaction(id: string): Promise<SingleTransactionResponse> {
    try {
      const { data, error } = await supabase
        .from('account_transactions')
        .delete()
        .match({ id })
        .select()
        .single();

      if (error) {
        this.logger.error('İşlem silinirken hata oluştu', { 
          id,
          error: error.message 
        });
        
        return {
          success: false,
          error: error.message
        };
      }

      this.logger.info('İşlem başarıyla silindi', { id });
      
      return {
        success: true,
        data
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      
      this.logger.error('İşlem silme servisi hatası', { 
        id, 
        error: errorMessage 
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
