
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { TransactionFormData, Transaction } from "../types";
import { useTransactionForm } from "./useTransactionForm";
import { useTransactionEdit } from "./useTransactionEdit";
import { format } from "date-fns";

/**
 * Transaction form gönderme işlemlerini yöneten hook
 */
export const useTransactionSubmit = (
  accountId: string,
  transaction?: Transaction
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const isEditMode = !!transaction;
  
  // Transaction form hook'ları
  const { handleCreateTransaction, prepareTransactionData, isSubmitting: isCreating } = useTransactionForm();
  const { handleUpdateTransaction, prepareUpdateData, isSubmitting: isUpdating, findStatementForDate } = useTransactionEdit();
  
  // İşlem oluşturma/güncelleme durumu
  const isSubmitting = isEditMode ? isUpdating : isCreating;
  
  // Form gönderme işleyicisi
  const handleSubmit = async (
    formData: TransactionFormData, 
    date: Date,
    currentStatementId: string | null,
    lockStatement: boolean
  ): Promise<boolean> => {
    // Ekstre ID yoksa işlem yapma
    if (!currentStatementId) {
      toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
      return false;
    }
    
    // Düzenleme modu
    if (isEditMode && transaction) {
      console.log('Executing transaction update for:', transaction.id);
      
      try {
        // Form verilerini API formatına dönüştür
        const updateData = prepareUpdateData(formData, accountId, currentStatementId);
        
        // Tarih değişikliği var mı kontrol et
        let targetStatementId = currentStatementId;
        
        // Tarih değişikliği varsa ve ekstre kilidi açıksa, uygun ekstreyi bul
        if (!lockStatement) {
          const dateChanged = format(date, 'yyyy-MM-dd') !== format(new Date(transaction.transaction_date), 'yyyy-MM-dd');
          
          if (dateChanged) {
            const foundStatementId = await findStatementForDate(accountId, date);
            if (foundStatementId) {
              targetStatementId = foundStatementId;
            } else {
              toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
              return false;
            }
          }
        }
        
        // İşlemi güncelle
        return await handleUpdateTransaction(
          transaction.id,
          updateData,
          transaction.statement_id,
          targetStatementId,
          accountId
        );
      } catch (error) {
        console.error('Error during transaction update:', error);
        toast.error(t("common:errors.unexpectedError"));
        return false;
      }
    } 
    // Yeni işlem oluşturma
    else {
      console.log('Executing transaction creation');
      
      try {
        // Form verilerini API formatına dönüştür
        const transactionData = prepareTransactionData(formData, accountId, currentStatementId);
        
        // İşlemi oluştur
        return await handleCreateTransaction(transactionData);
      } catch (error) {
        console.error('Error during transaction creation:', error);
        toast.error(t("common:errors.unexpectedError"));
        return false;
      }
    }
  };
  
  return {
    handleSubmit,
    isSubmitting,
    isEditMode
  };
};
