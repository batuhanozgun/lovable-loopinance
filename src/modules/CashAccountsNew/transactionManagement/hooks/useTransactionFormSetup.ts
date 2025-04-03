
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
import { useTransactionEdit } from "./useTransactionEdit";

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
  statementId?: string,
  transaction?: Transaction
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
  // Düzenleme modu kontrolü
  const isEditMode = !!transaction;
  
  // Şu anki zaman
  const now = new Date();
  const currentHour = format(now, "HH");
  const currentMinuteValue = parseInt(format(now, "mm"));
  const roundedMinute = roundToNearest15Minutes(currentMinuteValue);
  
  // Form durumu için değişkenler
  const [date, setDate] = useState<Date>(
    isEditMode && transaction ? new Date(transaction.transaction_date) : now
  );
  
  // Saat ayarı - eğer düzenleme moduysa, işlemin zamanını al
  const initialTime = isEditMode && transaction
    ? (() => {
        const [hour, minute] = transaction.transaction_time.substring(0, 5).split(':');
        return { hour, minute };
      })()
    : { hour: currentHour, minute: roundedMinute };
  
  const [time, setTime] = useState<{hour: string, minute: string}>(initialTime);
  
  // Kategori ayarı
  const initialCategoryId = isEditMode && transaction 
    ? (transaction.category_id || "no-category") 
    : "no-category";
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId);
  const [currentStatementId, setCurrentStatementId] = useState<string | null>(statementId || null);
  const [currentStatement, setCurrentStatement] = useState<AccountStatement | null>(null);
  const [statementError, setStatementError] = useState<string | null>(null);
  const [isLoadingStatement, setIsLoadingStatement] = useState<boolean>(false);
  const [lockStatement, setLockStatement] = useState<boolean>(!!statementId);
  
  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // Form varsayılan değerleri
  const defaultValues = isEditMode && transaction
    ? {
        amount: transaction.amount.toString(),
        description: transaction.description || "",
        transactionType: transaction.transaction_type,
        transactionDate: date,
        transactionTime: time,
        categoryId: initialCategoryId,
        subcategoryId: transaction.subcategory_id || "no-subcategory",
      }
    : {
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
      };

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Transaction form hook'ları
  const { handleCreateTransaction, prepareTransactionData, isSubmitting: isCreating } = useTransactionForm();
  const { handleUpdateTransaction, prepareUpdateData, isSubmitting: isUpdating, findStatementForDate } = useTransactionEdit();
  
  // İşlem oluşturma/güncelleme durumu
  const isSubmitting = isEditMode ? isUpdating : isCreating;
  
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
    console.log('isEditMode:', isEditMode);
    
    const loadStatement = async () => {
      try {
        setIsLoadingStatement(true);
        
        if (statementId) {
          // Belirli bir statementId verilmişse, o ekstreyi yükle
          console.log('Loading specific statement with ID:', statementId);
          
          const foundStatement = await StatementFinderService.getStatementById(statementId);
          
          if (foundStatement) {
            console.log('Specific statement loaded:', foundStatement);
            console.log('Statement period:', foundStatement.start_date, 'to', foundStatement.end_date);
            setCurrentStatement(foundStatement);
            setCurrentStatementId(statementId);
          } else {
            console.warn('Provided statement not found');
            setStatementError(t("TransactionManagement:errors.statement.notFound"));
            toast.error(t("TransactionManagement:errors.statement.notFound"));
          }
        } else {
          // StatementId verilmemişse tarihe göre ekstre ara
          console.log('No statementId provided, searching by date:', date);
          await updateStatementForDate(date);
        }
      } catch (error) {
        console.error('Error during statement initialization:', error);
        setStatementError(t("TransactionManagement:errors.statement.loadFailed"));
      } finally {
        setIsLoadingStatement(false);
      }
    };
    
    loadStatement();
    console.log('======== END INITIALIZATION LOGS ========');
  }, [accountId, statementId, date, isEditMode, t]); // Bağımlılıkları düzgün şekilde ekledik
  
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
    
    // Eğer düzenleme moduysa
    if (isEditMode && transaction) {
      console.log('Executing in EDIT mode for transaction:', transaction.id);
      
      try {
        // Form verilerini API formatına dönüştür
        const updateData = prepareUpdateData(formData, accountId, currentStatementId);
        
        // Tarih değişikliği var mı kontrol et
        let targetStatementId = currentStatementId;
        
        // Tarih değişikliği varsa ve ekstre kilidi açıksa, uygun ekstreyi bul
        if (!lockStatement) {
          const dateChanged = format(date, 'yyyy-MM-dd') !== format(new Date(transaction.transaction_date), 'yyyy-MM-dd');
          
          if (dateChanged) {
            const foundStatementId = await findStatementForDate(accountId, date);
            if (foundStatementId) {
              targetStatementId = foundStatementId;
            } else {
              toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
              return false;
            }
          }
        }
        
        // İşlemi güncelle
        return await handleUpdateTransaction(
          transaction.id,
          updateData,
          transaction.statement_id,
          targetStatementId,
          accountId
        );
      } catch (error) {
        console.error('Error during transaction update:', error);
        toast.error(t("common:errors.unexpectedError"));
        return false;
      }
    } else {
      // Yeni işlem oluşturma
      console.log('Executing in CREATE mode');
      
      // Form verilerini API formatına dönüştür
      const transactionData = prepareTransactionData(formData, accountId, currentStatementId);
      
      // İşlemi oluştur
      return await handleCreateTransaction(transactionData);
    }
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
    toggleStatementLock,
    isEditMode
  };
};
