
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Transaction, TransactionFormData, TransactionType } from "../types";
import { createTransactionFormSchema } from "../validation/schema";
import { getCurrentRoundedTime, getTimeFromTransaction } from "../utils/dateTimeUtils";
import { useTranslation } from "react-i18next";

/**
 * Transaction form değerlerini ve durumunu yöneten hook
 */
export const useTransactionFormValues = (
  transaction?: Transaction,
  date?: Date,
  initialStatementId?: string | null
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
  // Düzenleme modu kontrolü
  const isEditMode = !!transaction;
  
  // Geçerli tarih ve zaman
  const currentTime = getCurrentRoundedTime();
  
  // Form durumu için değişkenler
  const [formDate, setFormDate] = useState<Date>(
    isEditMode && transaction ? new Date(transaction.transaction_date) : date || currentTime.date
  );
  
  // Saat ayarı - eğer düzenleme moduysa, işlemin zamanını al
  const initialTime = isEditMode && transaction
    ? getTimeFromTransaction(transaction.transaction_time)
    : currentTime.time;
  
  const [formTime, setFormTime] = useState<{hour: string, minute: string}>(initialTime);
  
  // Kategori ayarı
  const initialCategoryId = isEditMode && transaction 
    ? (transaction.category_id || "no-category") 
    : "no-category";
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId);
  
  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // Form varsayılan değerleri
  const defaultValues = isEditMode && transaction
    ? {
        amount: transaction.amount.toString(),
        description: transaction.description || "",
        transactionType: transaction.transaction_type,
        transactionDate: formDate,
        transactionTime: formTime,
        categoryId: initialCategoryId,
        subcategoryId: transaction.subcategory_id || "no-subcategory",
      }
    : {
        amount: "",
        description: "",
        transactionType: TransactionType.INCOME,
        transactionDate: formDate,
        transactionTime: formTime,
        categoryId: "no-category",
        subcategoryId: "no-subcategory",
      };

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  
  // Kategori değişikliğini yönet
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategoryId", "no-subcategory");
  };
  
  // Form tarihini ve zamanını değiştirme işleyicileri
  const handleDateChange = (newDate: Date) => {
    setFormDate(newDate);
    form.setValue('transactionDate', newDate);
    return newDate;
  };
  
  const handleTimeChange = (newTime: {hour: string, minute: string}) => {
    setFormTime(newTime);
    form.setValue('transactionTime', newTime);
  };
  
  return {
    form,
    isEditMode,
    date: formDate,
    setDate: handleDateChange,
    time: formTime,
    setTime: handleTimeChange,
    selectedCategoryId,
    handleCategoryChange
  };
};
