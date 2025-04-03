
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { format, parse } from "date-fns";
import { 
  Transaction, 
  TransactionFormData, 
  TransactionType 
} from "../types";
import { createTransactionFormSchema } from "../validation/schema";
import { TransactionUpdateService } from "../services/TransactionUpdateService";

/**
 * İşlem düzenleme hook'u
 */
export const useTransactionEdit = (
  transaction: Transaction,
  onSuccess?: () => Promise<void>
) => {
  const { t } = useTranslation("TransactionManagement");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // İşlem tarihinden Date objesi oluştur
  const transactionDate = new Date(transaction.transaction_date);
  
  // İşlem saatini ayrıştır
  const timeWithoutSeconds = transaction.transaction_time.substring(0, 5); // "HH:MM" formatına getir
  const [hour, minute] = timeWithoutSeconds.split(":");
  
  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);
  
  // Form nesnesini oluştur ve varsayılan değerleri ayarla
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionType: transaction.transaction_type as TransactionType,
      amount: String(Math.abs(transaction.amount)),
      transactionDate: transactionDate,
      transactionTime: {
        hour: hour || "00",
        minute: minute || "00",
      },
      description: transaction.description || "",
      categoryId: transaction.category_id || "no-category",
      subcategoryId: transaction.subcategory_id || "no-subcategory",
    },
  });
  
  // Form verilerini API formatına dönüştür
  const prepareTransactionData = useCallback((formData: TransactionFormData): Partial<Transaction> => {
    // Tarih formatını ayarla (YYYY-MM-DD)
    const formattedDate = format(formData.transactionDate, "yyyy-MM-dd");
    
    // Saat formatını ayarla (HH:MM:00)
    const formattedTime = `${formData.transactionTime.hour}:${formData.transactionTime.minute}:00`;
    
    // İşlem tutarını hazırla
    let amount = Math.abs(parseFloat(formData.amount));
    
    // Eğer işlem tipi gider ise tutarı negatif yap
    if (formData.transactionType === TransactionType.EXPENSE) {
      amount = -amount;
    }
    
    // Kategori ve alt kategori kontrolleri
    const categoryId = formData.categoryId !== "no-category" ? formData.categoryId : null;
    const subcategoryId = formData.subcategoryId !== "no-subcategory" ? formData.subcategoryId : null;
    
    return {
      transaction_type: formData.transactionType,
      transaction_date: formattedDate,
      transaction_time: formattedTime,
      amount,
      description: formData.description,
      category_id: categoryId,
      subcategory_id: subcategoryId,
    };
  }, []);
  
  // İşlem güncelleme fonksiyonu
  const handleUpdateTransaction = useCallback(async (formData: TransactionFormData) => {
    setIsSubmitting(true);
    
    try {
      // Form verilerini API formatına dönüştür
      const transactionData = prepareTransactionData(formData);
      
      // İşlemi güncelle
      const response = await TransactionUpdateService.updateTransaction(
        transaction.id,
        transactionData
      );
      
      if (!response.success) {
        toast({
          title: t("errors.transaction.update.title"),
          description: response.error || t("errors.transaction.update.description"),
          variant: "destructive",
        });
        return false;
      }
      
      // Başarılı sonuç bildirimi
      toast({
        title: t("transaction.updateSuccess.title"),
        description: t("transaction.updateSuccess.description"),
      });
      
      // Başarı callback'ini çağır
      if (onSuccess) {
        await onSuccess();
      }
      
      return true;
    } catch (error) {
      console.error("Error updating transaction:", error);
      
      toast({
        title: t("errors.transaction.update.title"),
        description: t("errors.transaction.update.unknownError"),
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [transaction.id, prepareTransactionData, toast, t, onSuccess]);
  
  // Tarih ve zaman durumu için state'ler
  const [date, setDate] = useState<Date>(transactionDate);
  const [time, setTime] = useState<{hour: string, minute: string}>({
    hour: hour || "00",
    minute: minute || "00"
  });
  
  // Kategori durumu için state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    transaction.category_id || "no-category"
  );
  
  // Kategori değiştirme işleyicisi
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategoryId", "no-subcategory");
  }, [form]);
  
  return {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit: handleUpdateTransaction,
    isSubmitting,
  };
};
