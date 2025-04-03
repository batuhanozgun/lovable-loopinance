

import { supabase } from "@/integrations/supabase/client";
import { Transaction, TransactionType, TransactionResponse } from "../types";
import { StatementFinderService } from "./StatementFinderService";
import { ModuleLogger } from "@/modules/Logging/core/ModuleLogger";
import { StatementService } from "../../statementManagement/services/StatementService";

/**
 * İşlem güncelleme servisi
 */
export class TransactionUpdateService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionUpdateService');

  /**
   * Varolan bir işlemi günceller
   * @param transactionId Güncellenecek işlem ID'si
   * @param transaction İşlem verileri
   * @returns Güncellenen işlem
   */
  static async updateTransaction(
    transactionId: string,
    transaction: Partial<Transaction>
  ): Promise<TransactionResponse> {
    try {
      this.logger.debug('İşlem güncelleme başlatıldı', { transactionId, transaction });

      // Mevcut işlemi getir
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('cash_account_transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

      if (fetchError) {
        this.logger.error('İşlem bulunamadı', { transactionId, error: fetchError.message });
        return {
          success: false,
          error: `İşlem bulunamadı: ${fetchError.message}`
        };
      }

      // İşlem tipini kontrol et
      const transactionType = transaction.transaction_type 
        || existingTransaction.transaction_type;

      // Eski statement_id'yi saklayalım, değişim olup olmadığını kontrol etmek için
      const oldStatementId = existingTransaction.statement_id;
      let statementId = oldStatementId;
      
      // Eğer tarih değişmişse yeni statement kontrolü yap
      if (transaction.transaction_date && 
          transaction.transaction_date !== existingTransaction.transaction_date) {
        
        // Yeni tarihe göre uygun statement bul
        const date = new Date(transaction.transaction_date);
        const statement = await StatementFinderService.findStatementForDate(
          existingTransaction.account_id,
          date
        );

        if (!statement) {
          this.logger.error('Seçilen tarih için uygun ekstre bulunamadı', {
            transactionId,
            accountId: existingTransaction.account_id,
            date: transaction.transaction_date
          });
          
          return {
            success: false,
            error: 'Seçilen tarih için uygun ekstre bulunamadı'
          };
        }

        // Yeni statement ID'yi kaydet
        statementId = statement.id;
        
        this.logger.debug('İşlem farklı bir ekstreye taşınacak', {
          transactionId,
          oldStatementId: existingTransaction.statement_id,
          newStatementId: statementId,
          date: transaction.transaction_date
        });
      }

      // Güncellenecek verileri hazırla
      const updateData: Partial<Transaction> = {
        ...transaction,
        statement_id: statementId,
        updated_at: new Date().toISOString()
      };

      // İşlemi güncelle
      const { data, error } = await supabase
        .from('cash_account_transactions')
        .update(updateData)
        .eq('id', transactionId)
        .select()
        .single();

      if (error) {
        this.logger.error('İşlem güncellenirken hata oluştu', { transactionId, error: error.message });
        return {
          success: false,
          error: `İşlem güncellenirken hata oluştu: ${error.message}`
        };
      }

      this.logger.debug('İşlem başarıyla güncellendi', { transactionId, updated: data });
      
      // İşlem güncellendikten sonra etkilenen ekstre(leri) tekrar hesapla ve zincirleme yap
      await this.recalculateAffectedStatements(existingTransaction.account_id, oldStatementId, statementId);
      
      return {
        success: true,
        data
      };
    } catch (error) {
      this.logger.error('İşlem güncellemede beklenmeyen hata', { transactionId, error });
      return {
        success: false,
        error: error instanceof Error 
          ? `Beklenmeyen hata: ${error.message}` 
          : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
  
  /**
   * Etkilenen ekstrelerin bakiyelerini yeniden hesaplar
   * @param accountId Hesap ID'si
   * @param oldStatementId Eski ekstre ID'si
   * @param newStatementId Yeni ekstre ID'si
   */
  private static async recalculateAffectedStatements(
    accountId: string,
    oldStatementId: string,
    newStatementId: string
  ): Promise<void> {
    try {
      // Eski ekstrenin bakiyelerini yeniden hesapla
      await StatementService.recalculateStatementBalance(
        oldStatementId,
        accountId,
        true  // Zincirleme güncelleme yap
      );
      
      // Eğer işlem farklı bir ekstreye taşındıysa, yeni ekstrenin bakiyelerini de hesapla
      if (oldStatementId !== newStatementId) {
        await StatementService.recalculateStatementBalance(
          newStatementId,
          accountId,
          true  // Zincirleme güncelleme yap
        );
      }
      
      this.logger.debug('Etkilenen ekstrelerin bakiyeleri güncellendi', {
        accountId,
        oldStatementId,
        newStatementId
      });
    } catch (error) {
      this.logger.error('Ekstre bakiyeleri güncellenirken hata oluştu', {
        accountId,
        oldStatementId,
        newStatementId,
        error: error instanceof Error ? error.message : String(error)
      });
      // Bu hata yüzünden ana işlemin başarısız olmasını istemiyoruz, bu yüzden hata fırlatmıyoruz
    }
  }
}

