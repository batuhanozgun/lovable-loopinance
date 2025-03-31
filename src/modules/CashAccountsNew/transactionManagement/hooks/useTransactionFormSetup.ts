
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Transaction, TransactionFormData, TransactionType } from "../types";
import { createTransactionFormSchema } from "../validation/schema";
import { useTransactionForm } from "./useTransactionForm";
import { StatementFinderService } from "../services/StatementFinderService";
import { toast } from "sonner";

/**
 * İşlem formu kurulumu için ana hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId?: string
) => {
  const { t } = useTranslation(["CashAccountsNew", "common", "errors"]);
  
  // Form durumu için değişkenler
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<{hour: string, minute: string}>({
    hour: format(new Date(), "HH"),
    minute: format(new Date(), "mm")
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("no-category");
  const [currentStatementId, setCurrentStatementId] = useState<string | null>(statementId || null);
  const [statementError, setStatementError] = useState<string | null>(null);
  
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

  // Transaction form hook'u
  const { handleCreateTransaction, prepareTransactionData, isSubmitting } = useTransactionForm();
  
  // Kategori değişikliğini yönet
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategoryId", "no-subcategory");
  };
  
  // Tarih değişikliğinde uygun ekstreyi bul
  const updateStatementForDate = async (newDate: Date) => {
    if (!statementId) { // Sadece statementId prop'u verilmemişse ekstre araması yap
      try {
        setStatementError(null);
        const foundStatementId = await StatementFinderService.findStatementForDate(accountId, newDate);
        
        if (foundStatementId) {
          setCurrentStatementId(foundStatementId);
          console.log('Found statement for date:', foundStatementId);
        } else {
          console.warn('No statement found for the selected date');
          setCurrentStatementId(null);
          setStatementError(t("errors:transaction.noValidStatement"));
          toast.error(t("errors:transaction.noValidStatement"));
        }
      } catch (error) {
        console.error('Error finding statement for date:', error);
        setStatementError(t("errors:statement.loadFailed"));
      }
    }
  };
  
  // Form ilk yüklendiğinde ekstre kontrolü yap
  useState(() => {
    if (!statementId) {
      updateStatementForDate(date);
    }
  });
  
  // Tarih değiştiğinde ekstre güncelle
  const handleDateChange = async (newDate: Date) => {
    setDate(newDate);
    form.setValue('transactionDate', newDate);
    await updateStatementForDate(newDate);
  };
  
  // Form gönderme işleyicisi
  const handleSubmit = async (formData: TransactionFormData) => {
    // Eğer uygun statementId bulunamadıysa, uyarı göster
    if (!currentStatementId) {
      toast.error(t("errors:transaction.noValidStatement"));
      return false;
    }
    
    // Form verilerini API formatına dönüştür
    const transactionData = prepareTransactionData(formData, accountId, currentStatementId);
    
    // İşlemi oluştur
    return await handleCreateTransaction(transactionData);
  };

  return {
    form,
    date,
    setDate: handleDateChange,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit: handleSubmit,
    isSubmitting,
    statementId: currentStatementId,
    statementError
  };
};
