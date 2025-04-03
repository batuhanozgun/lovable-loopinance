
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Transaction, TransactionFormData } from "../types";
import { useTransactionFormValues } from "./useTransactionFormValues";
import { useStatementSelection } from "./useStatementSelection";
import { useTransactionSubmit } from "./useTransactionSubmit";
import { toast } from "sonner";

/**
 * İşlem formu kurulumu için ana hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId?: string,
  transaction?: Transaction
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const isEditMode = !!transaction;
  
  // Form değerlerini yönetme
  const { 
    form, 
    date, 
    setDate, 
    time, 
    setTime, 
    selectedCategoryId, 
    handleCategoryChange 
  } = useTransactionFormValues(transaction, undefined, statementId);
  
  // Statement seçimi ve yönetimi
  const { 
    currentStatementId, 
    currentStatement, 
    isLoadingStatement, 
    statementError, 
    lockStatement, 
    toggleStatementLock, 
    findStatementForDate 
  } = useStatementSelection(accountId, statementId, date);
  
  // Form gönderme işlemleri
  const { 
    handleSubmit: submitTransaction, 
    isSubmitting, 
    isEditMode: isEditingTransaction 
  } = useTransactionSubmit(accountId, transaction);
  
  // Tarih değiştiğinde statement güncelleme
  const handleDateChange = async (newDate: Date) => {
    console.log('Date changed to:', newDate);
    
    // Tarihi form değerlerine ayarla
    const updatedDate = setDate(newDate);
    
    // Tarihi değiştirdiğimizde statement araması yap
    await findStatementForDate(updatedDate);
  };
  
  // Form gönderme işleyicisi
  const onSubmit = async (formData: TransactionFormData) => {
    return await submitTransaction(formData, date, currentStatementId, lockStatement);
  };
  
  // Değişiklik yapıldıktan sonra, statement bulma işlemi için tarih değişimini izle
  useEffect(() => {
    if (accountId && date && !statementId) {
      findStatementForDate(date);
    }
  }, [date, accountId, statementId]);
  
  return {
    form,
    date,
    setDate: handleDateChange,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit,
    isSubmitting,
    statementId: currentStatementId,
    statement: currentStatement,
    isLoadingStatement,
    statementError,
    lockStatement,
    toggleStatementLock,
    isEditMode
  };
};
