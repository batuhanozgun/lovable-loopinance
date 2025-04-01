
/**
 * İşlem güncelleme hook'u
 */
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionUpdateService } from '../services/TransactionUpdateService';
import { Transaction, UpdateTransactionData } from '../types';
import { format } from 'date-fns';

/**
 * İşlem güncelleme için özel hook
 */
export const useTransactionUpdate = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Bir işlemi günceller
   */
  const updateTransaction = async (
    transactionId: string,
    data: UpdateTransactionData
  ): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      console.log('Initiating transaction update:', { transactionId, data });
      
      const response = await TransactionUpdateService.updateTransaction(transactionId, data);
      
      console.log('Transaction update service response:', response);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('TransactionManagement:errors.transaction.update.failed')
        });
        return false;
      }
      
      // İlgili sorguları geçersiz kılarak verileri yenile
      if (response.data) {
        await queryClient.invalidateQueries({ queryKey: ['statementTransactions', response.data.statement_id] });
        await queryClient.invalidateQueries({ queryKey: ['statement', response.data.statement_id] });
        await queryClient.invalidateQueries({ queryKey: ['statements', response.data.account_id] });
        await queryClient.refetchQueries({ queryKey: ['cashAccountsNew'] });
      }
      
      toast({
        title: t('common:success'),
        description: t('TransactionManagement:transaction.updateSuccess')
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error('Unexpected error updating transaction:', error);
      
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('TransactionManagement:errors.transaction.update.failed')
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Form verilerini API güncellemesi için dönüştürür
   */
  const prepareUpdateData = (formData: any): UpdateTransactionData => {
    const updateData: UpdateTransactionData = {};
    
    // Tarih alanı varsa
    if (formData.transactionDate) {
      updateData.transaction_date = format(formData.transactionDate, 'yyyy-MM-dd');
    }
    
    // Zaman alanı varsa
    if (formData.transactionTime) {
      updateData.transaction_time = `${formData.transactionTime.hour}:${formData.transactionTime.minute}`;
    }
    
    // Tutar alanı varsa (virgülleri noktalara çevir)
    if (formData.amount) {
      const amountString = formData.amount.replace(/\./g, '').replace(',', '.');
      updateData.amount = parseFloat(amountString);
    }
    
    // İşlem türü varsa
    if (formData.transactionType) {
      updateData.transaction_type = formData.transactionType;
    }
    
    // Açıklama alanı varsa
    if (formData.description !== undefined) {
      updateData.description = formData.description || '';
    }
    
    // Kategori alanı varsa
    if (formData.categoryId) {
      updateData.category_id = formData.categoryId !== 'no-category' ? formData.categoryId : null;
    }
    
    // Alt kategori alanı varsa
    if (formData.subcategoryId) {
      updateData.subcategory_id = formData.subcategoryId !== 'no-subcategory' ? formData.subcategoryId : null;
    }
    
    return updateData;
  };

  return {
    updateTransaction,
    prepareUpdateData,
    isSubmitting
  };
};
