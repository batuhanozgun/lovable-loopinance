
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../../types";
import { useTransactionForm } from "../../../hooks/useTransactionForm";
import { createTransactionFormSchema, TransactionFormData } from "../validation/schema";
import { TimeInput } from "../types";

/**
 * İşlem formu kurulumu için hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId: string
) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleCreateTransaction, isSubmitting } = useTransactionForm();
  
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

    // İşlem verisini formatla
    const transaction = {
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

    const success = await handleCreateTransaction(transaction);
    if (success) {
      form.reset();
      return true;
    }
    
    return false;
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
  };
};
