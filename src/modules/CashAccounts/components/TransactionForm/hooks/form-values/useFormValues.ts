
import { useEffect } from "react";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { AccountTransaction } from "../../../../types";
import { TransactionType } from "../../../../types";
import { TransactionFormData } from "../../validation/schema";
import { convertCentsToAmount } from "../../../../utils/amountUtils";
import { serviceLogger } from "../../../../logging";

/**
 * Düzenleme modunda form değerlerini doldurmak için hook
 */
export const useFormValues = (
  form: UseFormReturn<TransactionFormData>,
  setDate: (date: Date) => void,
  setTime: (time: { hour: string; minute: string }) => void,
  setSelectedCategoryId: (categoryId: string) => void,
  transaction?: AccountTransaction
) => {
  const logger = serviceLogger;
  const isEditMode = !!transaction;

  // Düzenleme modu ise, mevcut işlem verilerini forma doldur
  useEffect(() => {
    if (isEditMode && transaction) {
      logger.debug('Loading existing transaction data into form', { 
        transactionId: transaction.id 
      });
      console.log('Loading existing transaction data into form:', transaction);
      
      // Tarihi ayarla
      const transactionDate = new Date(transaction.transaction_date);
      setDate(transactionDate);
      
      // Zamanı ayarla
      if (transaction.transaction_time) {
        const [hour, minute] = transaction.transaction_time.split(':');
        setTime({ hour, minute });
      }
      
      // Kategoriyi ayarla
      if (transaction.category_id) {
        setSelectedCategoryId(transaction.category_id);
      }
      
      // Form değerlerini ayarla
      form.reset({
        // Tutarı kuruş'tan TL'ye çeviriyoruz (veritabanında kuruş olarak saklanıyor)
        amount: transaction.amount ? String(convertCentsToAmount(transaction.amount)) : "",
        description: transaction.description || '',
        transactionType: transaction.transaction_type as TransactionType,
        transactionDate: transactionDate,
        transactionTime: {
          hour: transaction.transaction_time ? transaction.transaction_time.split(':')[0] : format(transactionDate, "HH"),
          minute: transaction.transaction_time ? transaction.transaction_time.split(':')[1] : format(transactionDate, "mm")
        },
        categoryId: transaction.category_id || 'no-category',
        subcategoryId: transaction.subcategory_id || 'no-subcategory',
      });
    }
  }, [transaction, isEditMode, form, setDate, setTime, setSelectedCategoryId]);

  return {
    isEditMode
  };
};
