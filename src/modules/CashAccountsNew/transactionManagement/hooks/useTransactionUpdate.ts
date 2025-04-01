
/**
 * İşlem güncelleme için özel hook
 */
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Transaction, TransactionFormData, TransactionType } from '../types';
import { TransactionUpdateService } from '../services/TransactionUpdateService';

export const useTransactionUpdate = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  /**
   * İşlem formu verilerini işlem güncelleme verilerine dönüştürür
   */
  const prepareUpdateData = (formData: TransactionFormData): Partial<Transaction> => {
    // Tarih ve saat formatlamaları
    const transactionDate = formData.transactionDate.toISOString().split('T')[0];
    const transactionTime = `${formData.transactionTime.hour}:${formData.transactionTime.minute}:00`;
    
    // İşlem tutarı pozitif olarak saklanır, işlem tipi ile birlikte değerlendirilir
    const amount = Math.abs(parseFloat(formData.amount.replace(/[^\d.-]/g, '')));
    
    return {
      amount,
      transaction_type: formData.transactionType,
      transaction_date: transactionDate,
      transaction_time: transactionTime,
      description: formData.description || null,
      category_id: formData.categoryId || null,
      subcategory_id: formData.subcategoryId || null,
    };
  };
  
  /**
   * İşlemi günceller
   */
  const updateTransaction = async (
    transactionId: string, 
    formData: TransactionFormData
  ): Promise<boolean> => {
    try {
      setIsUpdating(true);
      
      const updateData = prepareUpdateData(formData);
      
      // İşlemi güncelle
      const result = await TransactionUpdateService.updateTransaction(
        transactionId,
        updateData
      );
      
      if (!result.success) {
        // Hata durumunda bildirim göster
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t(`errors.transaction.update.${result.error}`, { 
            ns: 'TransactionManagement',
            defaultValue: result.error || t('errors.transaction.update.failed', { ns: 'TransactionManagement' })
          }),
          variant: 'destructive',
        });
        return false;
      }
      
      // Başarılı bildirim göster
      toast({
        title: t('common:success', { ns: 'common' }),
        description: t('transaction.updateSuccess', { ns: 'TransactionManagement' }),
      });
      
      return true;
    } catch (error) {
      // Beklenmeyen hata durumunda bildirim göster
      toast({
        title: t('common:error', { ns: 'common' }),
        description: t('errors.transaction.update.failed', { ns: 'TransactionManagement' }),
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  /**
   * Form datasını oluşturmak için transaction objesini form datasına dönüştürür
   */
  const transactionToFormData = (transaction: Transaction): TransactionFormData => {
    // Tutarı formatlama
    const amount = transaction.amount.toString();
    
    // Tarihi parse etme
    const date = new Date(transaction.transaction_date);
    
    // Zamanı parse etme
    const [hour, minute] = transaction.transaction_time.split(':');
    
    return {
      amount,
      transactionType: transaction.transaction_type as TransactionType,
      transactionDate: date,
      transactionTime: {
        hour: hour || '00',
        minute: minute || '00'
      },
      description: transaction.description || '',
      categoryId: transaction.category_id || '',
      subcategoryId: transaction.subcategory_id || '',
    };
  };
  
  return {
    updateTransaction,
    transactionToFormData,
    isUpdating
  };
};
