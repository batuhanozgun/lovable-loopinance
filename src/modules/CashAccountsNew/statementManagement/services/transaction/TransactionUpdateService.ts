
/**
 * İşlem güncelleme servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { AccountTransaction, StatementTransactionResponse, transformTransactionData } from '../../types/transaction';

export class TransactionUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionUpdateService');

  /**
   * İşlem kaydını güncelle
   */
  static async updateTransaction(id: string, data: Partial<AccountTransaction>): Promise<StatementTransactionResponse> {
    try {
      this.logger.debug('Updating transaction', { id, data });
      
      // Belirli alanların güncellenmesi için sadece izin verilen alanları filtrele
      const allowedFields = [
        'amount', 
        'transaction_type', 
        'transaction_date', 
        'transaction_time', 
        'description', 
        'category_id', 
        'subcategory_id'
      ];
      
      // İzin verilen alanları içeren yeni bir nesne oluştur
      const filteredData: Record<string, any> = {};
      for (const field of allowedFields) {
        if (field in data) {
          filteredData[field] = (data as any)[field];
        }
      }
      
      // İşlem tüm bilgileri içermiyorsa hata döndür
      if (Object.keys(filteredData).length === 0) {
        this.logger.error('No valid fields to update', { id });
        return {
          success: false,
          error: 'Güncellenecek geçerli alanlar bulunamadı'
        };
      }
      
      // Veritabanında güncelleme yap
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .update(filteredData)
        .eq('id', id)
        .select('*')
        .single();
      
      if (error) {
        this.logger.error('Failed to update transaction', { id, error });
        
        // Yaygın hata durumlarını kontrol et
        let errorMessage = error.message;
        if (error.message.includes('violates foreign key constraint')) {
          errorMessage = 'Geçersiz ilişki referansı. Kategori veya alt kategori mevcut değil.';
        } else if (error.message.includes('violates check constraint')) {
          errorMessage = 'Geçersiz veri formatı. Lütfen girdiğiniz değerleri kontrol edin.';
        } else if (error.message.includes('permission denied')) {
          errorMessage = 'Bu işlemi güncelleme izniniz yok.';
        }
        
        return {
          success: false,
          error: errorMessage
        };
      }
      
      // Veriyi doğru enum tipine dönüştürüyoruz
      const transformedData = transformTransactionData(transaction);
      
      this.logger.info('Transaction updated successfully', { id });
      return {
        success: true,
        data: transformedData
      };
    } catch (error) {
      this.logger.error('Unexpected error updating transaction', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      };
    }
  }
}
