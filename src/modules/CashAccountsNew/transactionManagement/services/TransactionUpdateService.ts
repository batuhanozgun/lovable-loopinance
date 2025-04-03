
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementService } from '../../statementManagement/services/StatementService';
import { CreateTransactionData, Transaction, TransactionResponse } from '../types';

/**
 * İşlem güncelleme servisi
 */
export class TransactionUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionUpdateService');

  /**
   * Mevcut bir işlemi günceller
   * @param transactionId Güncellenecek işlem ID'si
   * @param data Güncelleme verileri
   * @returns İşlem sonucu
   */
  static async updateTransaction(transactionId: string, data: Partial<CreateTransactionData>): Promise<TransactionResponse> {
    try {
      this.logger.debug('Updating transaction', { transactionId, data });
      
      // Önce mevcut işlem bilgilerini al
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch existing transaction', { transactionId, error: fetchError });
        return {
          success: false,
          error: fetchError.message
        };
      }
      
      // Güncelleme verilerini hazırla
      const updateData: Partial<CreateTransactionData> = { ...data };
      
      // Ekstra alanları temizle
      if ('id' in updateData) delete updateData.id;
      if ('created_at' in updateData) delete updateData.created_at;
      if ('updated_at' in updateData) delete updateData.updated_at;
      
      // İşlemi güncelle
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .update(updateData)
        .eq('id', transactionId)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to update transaction', { transactionId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Transaction updated successfully', { id: transaction.id });
      
      // Ekstrenin değişip değişmediğini kontrol et
      let statements: string[] = [];
      
      if (existingTransaction.statement_id !== transaction.statement_id) {
        // Eskiden kullanılan ekstreyi ekle
        statements.push(existingTransaction.statement_id);
      }
      
      // Güncel kullanılan ekstreyi ekle
      statements.push(transaction.statement_id);
      
      // Tekrarlanan statement_id'leri kaldır
      statements = [...new Set(statements)];
      
      // Etkilenen tüm ekstre bakiyelerini güncelle
      for (const statementId of statements) {
        await StatementService.recalculateStatementBalance(
          statementId,
          transaction.account_id
        );
      }
      
      return {
        success: true,
        data: transaction as Transaction
      };
    } catch (error) {
      this.logger.error('Unexpected error updating transaction', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * İşleme ait ekstreyi değiştir
   * @param transactionId İşlem ID'si
   * @param newStatementId Yeni ekstre ID'si
   * @param accountId Hesap ID'si
   * @returns İşlem sonucu
   */
  static async changeTransactionStatement(
    transactionId: string, 
    newStatementId: string,
    accountId: string
  ): Promise<TransactionResponse> {
    try {
      this.logger.debug('Changing transaction statement', { 
        transactionId, 
        newStatementId,
        accountId
      });
      
      // Önce mevcut işlem bilgilerini al
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('account_transactions')
        .select('statement_id')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) {
        this.logger.error('Failed to fetch existing transaction', { transactionId, error: fetchError });
        return {
          success: false,
          error: fetchError.message
        };
      }
      
      const oldStatementId = existingTransaction.statement_id;
      
      // Ekstre aynıysa değişiklik yapma
      if (oldStatementId === newStatementId) {
        this.logger.info('Transaction already in the specified statement', { 
          transactionId, 
          statementId: newStatementId 
        });
        
        // Mevcut işlemi getir
        const { data: transaction, error: getError } = await supabase
          .from('account_transactions')
          .select()
          .eq('id', transactionId)
          .single();
        
        if (getError) {
          return {
            success: false,
            error: getError.message
          };
        }
        
        return {
          success: true,
          data: transaction as Transaction
        };
      }
      
      // Ekstre değiştir
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .update({ statement_id: newStatementId })
        .eq('id', transactionId)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to change transaction statement', { 
          transactionId, 
          newStatementId,
          error 
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Transaction statement changed successfully', { 
        id: transaction.id,
        oldStatementId,
        newStatementId
      });
      
      // Her iki ekstrenin bakiyelerini de güncelle
      await StatementService.recalculateStatementBalance(oldStatementId, accountId);
      await StatementService.recalculateStatementBalance(newStatementId, accountId);
      
      return {
        success: true,
        data: transaction as Transaction
      };
    } catch (error) {
      this.logger.error('Unexpected error changing transaction statement', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
