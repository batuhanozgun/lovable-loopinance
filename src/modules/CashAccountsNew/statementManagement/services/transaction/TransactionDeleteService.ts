
/**
 * İşlem silme servisi
 * Hesap ekstrelerindeki işlemleri silmek için kullanılır
 */
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementService } from '../StatementService';
import { 
  StatementTransactionResponse, 
  AccountTransaction,
  transformTransactionData 
} from '../../types/transaction';

export class TransactionDeleteService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionDeleteService');

  /**
   * Belirtilen ID'ye sahip işlemi siler
   * @param id Silinecek işlem ID'si
   * @returns İşlemin başarılı olup olmadığını belirten yanıt
   */
  static async deleteTransaction(id: string): Promise<StatementTransactionResponse> {
    try {
      // Önce işlemi getir (silmeden önce statement_id ve account_id değerlerini almak için)
      const { data: transactionData, error: getError } = await supabase
        .from('cash_account_transactions')
        .select('id, statement_id, account_id')
        .eq('id', id)
        .single();
      
      if (getError || !transactionData) {
        this.logger.error('İşlem bilgileri alınırken hata oluştu', { 
          id,
          error: getError?.message 
        });
        
        return {
          success: false,
          error: getError?.message || 'İşlem bulunamadı'
        };
      }
      
      // İşlemi sil
      const { data, error } = await supabase
        .from('cash_account_transactions')
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
      
      // İşlem silindikten sonra ilgili ekstrenin bakiyelerini yeniden hesapla
      // ve zincirleme güncelleme yap (true parametresi ile)
      await StatementService.recalculateStatementBalance(
        transactionData.statement_id,
        transactionData.account_id,
        true
      );
      
      // Veriyi doğru enum tipine dönüştürüyoruz
      const transformedData = transformTransactionData(data);
      
      return {
        success: true,
        data: transformedData
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
