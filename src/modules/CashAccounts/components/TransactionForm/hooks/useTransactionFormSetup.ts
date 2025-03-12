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
import { parseLocalizedNumber } from "../../../utils/amountUtils";

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
      transactionDate: new Date(),
      transactionTime: {
        hour: format(new Date(), "HH"),
        minute: format(new Date(), "mm")
      },
      categoryId: "no-category",
      subcategoryId: "no-subcategory",
    },
  });

  // Form değerlerini güncelleme
  useEffect(() => {
    form.setValue('transactionDate', date);
    form.setValue('transactionTime', time);
  }, [date, time, form]);

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
        transactionDate: transactionDate,
        transactionTime: {
          hour: transaction.transaction_time ? transaction.transaction_time.split(':')[0] : format(transactionDate, "HH"),
          minute: transaction.transaction_time ? transaction.transaction_time.split(':')[1] : format(transactionDate, "mm")
        },
        categoryId: transaction.category_id || 'no-category',
        subcategoryId: transaction.subcategory_id || 'no-subcategory',
      });
    }
  }, [transaction, isEditMode, form]);

  // Kategori değişikliğini yönet
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategoryId", "no-subcategory");
  };

  // Form gönderme işlemi
  const onSubmit = async (data: TransactionFormData) => {
    try {
      // Tarih ve saat bilgilerini birleştir
      const transactionDate = format(data.transactionDate, "yyyy-MM-dd");
      const transactionTime = `${data.transactionTime.hour}:${data.transactionTime.minute}:00`;

      // Özel değerleri null'a çevir
      const categoryId = data.categoryId === 'no-category' ? null : data.categoryId;
      const subcategoryId = data.subcategoryId === 'no-subcategory' ? null : data.subcategoryId;
      
      // Tutarı doğru formatla sayıya çevir (Türkçe yerelleştirme için)
      const amount = parseLocalizedNumber(data.amount);
      
      if (isNaN(amount)) {
        console.error("Geçersiz tutar formatı:", data.amount);
        return false;
      }

      if (isEditMode && transaction) {
        // Güncelleme işlemi
        const updatedTransaction = {
          amount,
          description: data.description || null,
          transaction_type: data.transactionType,
          transaction_date: transactionDate,
          transaction_time: transactionTime,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        };

        const success = await handleUpdateTransaction(transaction.id, updatedTransaction);
        return success;
      } else {
        // Yeni işlem oluşturma
        const newTransaction = {
          account_id: accountId,
          statement_id: statementId,
          amount,
          description: data.description || null,
          transaction_type: data.transactionType,
          transaction_date: transactionDate,
          transaction_time: transactionTime,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        };

        const success = await handleCreateTransaction(newTransaction);
        if (success) {
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
      }
    } catch (error) {
      console.error("Form submission error:", error);
      return false;
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
