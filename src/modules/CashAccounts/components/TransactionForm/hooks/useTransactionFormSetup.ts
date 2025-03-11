
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../../types";
import { useTransactionForm } from "../../../hooks/useTransactionForm";
import { createTransactionFormSchema, TransactionFormData } from "../validation/schema";
import { TimeInput } from "../types";
import { AccountTransaction } from "../../../types";

/**
 * İşlem formu kurulumu için hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId: string,
  transaction?: AccountTransaction
) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleCreateTransaction, handleUpdateTransaction, isSubmitting } = useTransactionForm();
  
  const isEditMode = !!transaction;
  
  // Form state'leri
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<TimeInput>({
    hour: format(new Date(), "HH"),
    minute: format(new Date(), "mm")
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionType: TransactionType.INCOME,
      categoryId: "",
      subcategoryId: "",
    },
  });

  // Düzenleme modu ise, mevcut işlem verilerini forma doldur
  useEffect(() => {
    if (isEditMode && transaction) {
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
        amount: String(transaction.amount),
        description: transaction.description || '',
        transactionType: transaction.transaction_type as TransactionType,
        categoryId: transaction.category_id || '',
        subcategoryId: transaction.subcategory_id || '',
      });
    }
  }, [transaction, isEditMode, form]);

  // Kategori değişikliğini yönet
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    // Farklı bir kategori seçildiğinde alt kategori seçimini sıfırla
    form.setValue("subcategoryId", "");
  };

  // Form gönderme işlemi
  const onSubmit = async (data: TransactionFormData) => {
    // Tarih ve saat bilgilerini birleştir
    const transactionDate = format(date, "yyyy-MM-dd");
    const transactionTime = `${time.hour}:${time.minute}:00`;

    if (isEditMode && transaction) {
      // Güncelleme işlemi
      const updatedTransaction = {
        amount: Number(data.amount),
        description: data.description || null,
        transaction_type: data.transactionType,
        transaction_date: transactionDate,
        transaction_time: transactionTime,
        category_id: data.categoryId || null,
        subcategory_id: data.subcategoryId || null,
      };

      const success = await handleUpdateTransaction(transaction.id, updatedTransaction);
      return success;
    } else {
      // Yeni işlem oluşturma
      const newTransaction = {
        account_id: accountId,
        statement_id: statementId,
        amount: Number(data.amount),
        description: data.description || null,
        transaction_type: data.transactionType,
        transaction_date: transactionDate,
        transaction_time: transactionTime,
        category_id: data.categoryId || null,
        subcategory_id: data.subcategoryId || null,
      };

      const success = await handleCreateTransaction(newTransaction);
      if (success) {
        form.reset();
      }
      return success;
    }
  };

  return {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit,
    isSubmitting,
    isEditMode
  };
};
