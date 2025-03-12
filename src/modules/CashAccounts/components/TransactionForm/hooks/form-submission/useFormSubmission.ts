
import { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useTransactionForm } from "../../../../hooks/useTransactionForm";
import { TransactionFormData } from "../../validation/schema";
import { parseLocalizedNumber, convertAmountToCents } from "../../../../utils/amountUtils";
import { serviceLogger } from "../../../../logging";
import { AccountTransaction } from "../../../../types";

/**
 * Form gönderimi ve veri işleme için hook
 */
export const useFormSubmission = (
  accountId: string,
  statementId: string,
  transaction?: AccountTransaction
) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleCreateTransaction, handleUpdateTransaction, isSubmitting } = useTransactionForm();
  const logger = serviceLogger;
  const isEditMode = !!transaction;

  // Form gönderme işlemi
  const onSubmit = async (data: TransactionFormData) => {
    try {
      logger.debug('Processing form submission', { formData: JSON.stringify(data) });
      console.log('Processing form submission:', data);
      
      // Tarih ve saat bilgilerini birleştir
      const transactionDate = format(data.transactionDate, "yyyy-MM-dd");
      const transactionTime = `${data.transactionTime.hour}:${data.transactionTime.minute}:00`;

      // Özel değerleri null'a çevir
      const categoryId = data.categoryId === 'no-category' ? null : data.categoryId;
      const subcategoryId = data.subcategoryId === 'no-subcategory' ? null : data.subcategoryId;
      
      // Tutarı doğru formatla sayıya çevir (Türkçe yerelleştirme için)
      const parsedAmount = parseLocalizedNumber(data.amount);
      
      if (isNaN(parsedAmount)) {
        const errorMsg = "Geçersiz tutar formatı: " + data.amount;
        logger.error(errorMsg);
        console.error(errorMsg);
        return false;
      }
      
      // Ondalıklı tutarı kuruşa (cent) çevir - veritabanında tam sayı olarak saklanıyor
      const amountInCents = convertAmountToCents(parsedAmount);
      
      logger.debug('Amount conversion', { 
        original: data.amount, 
        parsed: parsedAmount,
        cents: amountInCents 
      });
      console.log('Amount conversion:', {
        original: data.amount, 
        parsed: parsedAmount,
        cents: amountInCents
      });

      if (isEditMode && transaction) {
        // Güncelleme işlemi
        const updatedTransaction = {
          amount: amountInCents, // Kuruş olarak gönder
          description: data.description || null,
          transaction_type: data.transactionType,
          transaction_date: transactionDate,
          transaction_time: transactionTime,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        };

        logger.debug('Updating transaction', { 
          id: transaction.id, 
          transaction: JSON.stringify(updatedTransaction) 
        });
        console.log('Updating transaction:', { id: transaction.id, transaction: updatedTransaction });
        
        // transaction ID tanımlı değilse güvenlikli kontrol
        if (!transaction.id) {
          const errorMsg = "Transaction ID is missing for update operation";
          logger.error(errorMsg);
          console.error(errorMsg);
          return false;
        }
        
        const success = await handleUpdateTransaction(transaction.id, updatedTransaction);
        
        logger.debug('Update transaction result', { success });
        console.log('Update transaction result:', success);
        
        return success;
      } else {
        // Yeni işlem oluşturma
        const newTransaction = {
          account_id: accountId,
          statement_id: statementId,
          amount: amountInCents, // Kuruş olarak gönder
          description: data.description || null,
          transaction_type: data.transactionType,
          transaction_date: transactionDate,
          transaction_time: transactionTime,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        };

        logger.debug('Creating new transaction', { transaction: JSON.stringify(newTransaction) });
        console.log('Creating new transaction:', newTransaction);
        
        const success = await handleCreateTransaction(newTransaction);
        
        logger.debug('Create transaction result', { success });
        console.log('Create transaction result:', success);
        
        return success;
      }
    } catch (error) {
      // Tüm hata tiplerini güvenli bir şekilde işle
      const isErrorObject = error instanceof Error;
      const errorMessage = isErrorObject ? error.message : String(error);
      
      logger.error('Form submission error', { 
        error: errorMessage,
        stack: isErrorObject ? error.stack : 'No stack trace available' 
      });
      console.error("Form submission error:", error);
      return false;
    }
  };

  return {
    onSubmit,
    isSubmitting,
    isEditMode
  };
};
