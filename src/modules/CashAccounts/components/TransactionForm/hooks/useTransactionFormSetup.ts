
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountTransaction } from "../../../types";
import { useFormState } from "./form-state/useFormState";
import { useFormValues } from "./form-values/useFormValues";
import { useFormSubmission } from "./form-submission/useFormSubmission";
import { TransactionFormData } from "../validation/schema";
import { serviceLogger } from "../../../logging";
import { format } from "date-fns";
import { TransactionType } from "../../../types";

/**
 * İşlem formu kurulumu için ana hook
 * Bu hook, diğer özel hook'ları birleştirerek tam bir form yönetimi sağlar
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId: string,
  transaction?: AccountTransaction
) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const logger = serviceLogger;
  
  // Form durumu hook'u
  const {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    isEditMode: formStateIsEditMode
  } = useFormState(t, transaction);
  
  // Form değerleri hook'u
  useFormValues(form, transaction, setDate, setTime, (categoryId) => handleCategoryChange(categoryId));
  
  // Form gönderimi hook'u
  const {
    onSubmit: submitForm,
    isSubmitting,
    isEditMode: submissionIsEditMode
  } = useFormSubmission(accountId, statementId, transaction);
  
  // Form gönderme işleyicisi
  const handleSubmit = async (data: TransactionFormData) => {
    logger.debug('Form submitted with data', { formData: JSON.stringify(data) });
    console.log('Form submitted with data:', data);
    
    const success = await submitForm(data);
    
    logger.debug('Form submission result', { success });
    console.log('Form submission result:', success);
    
    if (success && !transaction) {
      // Başarılı ekleme işleminden sonra formu sıfırla (sadece yeni işlem oluşturma modunda)
      form.reset({
        amount: "",
        description: "",
        transactionType: TransactionType.INCOME,
        transactionDate: new Date(),
        transactionTime: {
          hour: format(new Date(), "HH"),
          minute: format(new Date(), "mm")
        },
        categoryId: "no-category",
        subcategoryId: "no-subcategory",
      });
    }
    
    return success;
  };

  return {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit: handleSubmit,
    isSubmitting,
    isEditMode: formStateIsEditMode
  };
};
