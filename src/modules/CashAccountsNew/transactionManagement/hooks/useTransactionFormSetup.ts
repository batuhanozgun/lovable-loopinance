
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Transaction, TransactionFormData, TransactionType } from "../types";
import { createTransactionFormSchema } from "../validation/schema";
import { useTransactionForm } from "./useTransactionForm";
import { StatementFinderService } from "../services/StatementFinderService";
import { toast } from "sonner";
import { AccountStatement } from "../../statementManagement/types";

/**
 * Dakika değerini en yakın 15'in katına yuvarla
 */
const roundToNearest15Minutes = (minuteValue: number): string => {
  const roundedMinute = Math.round(minuteValue / 15) * 15;
  if (roundedMinute === 60) return '00';
  return roundedMinute.toString().padStart(2, '0');
};

/**
 * İşlem formu kurulumu için ana hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId?: string
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
  // Şu anki zaman
  const now = new Date();
  const currentHour = format(now, "HH");
  const currentMinuteValue = parseInt(format(now, "mm"));
  const roundedMinute = roundToNearest15Minutes(currentMinuteValue);
  
  // Form durumu için değişkenler
  const [date, setDate] = useState<Date>(now);
  const [time, setTime] = useState<{hour: string, minute: string}>({
    hour: currentHour,
    minute: roundedMinute
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("no-category");
  const [currentStatementId, setCurrentStatementId] = useState<string | null>(statementId || null);
  const [currentStatement, setCurrentStatement] = useState<AccountStatement | null>(null);
  const [statementError, setStatementError] = useState<string | null>(null);
  const [isLoadingStatement, setIsLoadingStatement] = useState<boolean>(false);
  const [lockStatement, setLockStatement] = useState<boolean>(!!statementId);
  
  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionType: TransactionType.INCOME,
      transactionDate: now,
      transactionTime: {
        hour: currentHour,
        minute: roundedMinute
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
    // Eğer statement kilitli değilse (açık formdan gelmediyse) veya hiç statement yoksa yeni statement ara
    if (!lockStatement || !currentStatementId) {
      try {
        console.log('======== UPDATE STATEMENT FOR DATE LOGS ========');
        console.log('Updating statement for new date:', newDate);
        console.log('Date toString:', newDate.toString());
        console.log('Date toISOString:', newDate.toISOString());
        console.log('Date formatted:', format(newDate, 'yyyy-MM-dd'));
        
        setStatementError(null);
        setIsLoadingStatement(true);
        
        const foundStatement = await StatementFinderService.findStatementForDate(accountId, newDate);
        
        if (foundStatement) {
          console.log('Statement found successfully:', foundStatement);
          console.log('Setting currentStatementId:', foundStatement.id);
          console.log('Statement period:', foundStatement.start_date, 'to', foundStatement.end_date);
          console.log('Statement status:', foundStatement.status);
          
          setCurrentStatementId(foundStatement.id);
          setCurrentStatement(foundStatement);
        } else {
          console.warn('No statement found for the selected date');
          setCurrentStatementId(null);
          setCurrentStatement(null);
          setStatementError(t("TransactionManagement:errors.transaction.noValidStatement"));
          toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
        }
        console.log('======== END UPDATE STATEMENT FOR DATE LOGS ========');
      } catch (error) {
        console.error('Error finding statement for date:', error);
        setStatementError(t("TransactionManagement:errors.statement.loadFailed"));
      } finally {
        setIsLoadingStatement(false);
      }
    } else {
      console.log('Statement is locked, not updating for new date:', newDate);
    }
  };
  
  // Form ilk yüklendiğinde ekstre kontrolü yap
  useEffect(() => {
    console.log('======== INITIALIZATION LOGS ========');
    console.log('useTransactionFormSetup initialized with:');
    console.log('accountId:', accountId);
    console.log('statementId:', statementId);
    console.log('initial date:', date);
    
    if (statementId) {
      // Eğer bir statementId verilmişse, o ekstreyi yükle
      const loadSpecificStatement = async () => {
        try {
          setIsLoadingStatement(true);
          console.log('Loading specific statement with ID:', statementId);
          
          const foundStatement = await StatementFinderService.getStatementById(statementId);
          
          if (foundStatement) {
            console.log('Specific statement loaded:', foundStatement);
            console.log('Statement period:', foundStatement.start_date, 'to', foundStatement.end_date);
            setCurrentStatement(foundStatement);
          } else {
            console.warn('Provided statement not found');
            setStatementError(t("TransactionManagement:errors.statement.notFound"));
            toast.error(t("TransactionManagement:errors.statement.notFound"));
          }
        } catch (error) {
          console.error('Error loading specific statement:', error);
          setStatementError(t("TransactionManagement:errors.statement.loadFailed"));
        } finally {
          setIsLoadingStatement(false);
        }
      };
      
      loadSpecificStatement();
    } else {
      // Statementid verilmemişse tarihe göre ekstre ara
      console.log('No statementId provided, searching by date:', date);
      updateStatementForDate(date);
    }
    console.log('======== END INITIALIZATION LOGS ========');
  }, []); // Boş bağımlılık dizisi ile sadece bir kez çalışır
  
  // Tarih değiştiğinde ekstre güncelle
  const handleDateChange = async (newDate: Date) => {
    console.log('Date changed to:', newDate);
    console.log('Previous date was:', date);
    
    setDate(newDate);
    form.setValue('transactionDate', newDate);
    
    // Statementid belirtilmiş olsa bile tarihi değiştirdiğimizde ekstre araması yap
    await updateStatementForDate(newDate);
  };
  
  // StatementId kilidini açma/kapama fonksiyonu
  const toggleStatementLock = () => {
    setLockStatement(!lockStatement);
    
    // Kilit açıldıysa ve tarih değiştiyse yeni ekstre ara
    if (lockStatement) {
      updateStatementForDate(date);
    }
  };
  
  // Form gönderme işleyicisi
  const handleSubmit = async (formData: TransactionFormData) => {
    // Eğer uygun statementId bulunamadıysa, uyarı göster
    if (!currentStatementId) {
      toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
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
    statement: currentStatement,
    isLoadingStatement,
    statementError,
    lockStatement,
    toggleStatementLock
  };
};
