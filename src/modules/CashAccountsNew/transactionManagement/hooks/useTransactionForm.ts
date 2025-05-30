import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionCreationService } from '../services/TransactionCreationService';
import { CreateTransactionData, Transaction } from '../types';
import { format } from 'date-fns';

/**
 * İşlem formu ve işlemleri için özel hook
 */
export const useTransactionForm = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Yeni bir işlem oluşturur
   */
  const handleCreateTransaction = async (data: CreateTransactionData) => {
    setIsSubmitting(true);
    
    console.log('Initiating transaction creation:', data);
    
    try {
      const response = await TransactionCreationService.createTransaction(data);
      
      console.log('Transaction service response:', response);
      
      if (!response.success) {
        // Hata mesajını işleme ve görüntüleme
        let errorMessage = response.error || t('TransactionManagement:errors.transaction.create.failed');
        
        // Özel hata durumlarını kontrol et
        if (response.error?.includes('statement is closed')) {
          errorMessage = t('TransactionManagement:errors.transaction.create.statementClosed');
        } else if (response.error?.includes('permission') || response.error?.includes('policy')) {
          errorMessage = t('TransactionManagement:errors.transaction.create.insufficientPermissions');
        }
        
        console.error('Transaction creation failed:', errorMessage);
        
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: errorMessage
        });
        return false;
      }
      
      // İlgili sorguları geçersiz kılarak verileri yenile
      console.log('Invalidating and refetching queries after transaction creation');
      
      // İşlem oluşturulduktan sonra tüm sorguları geçersiz kıl ve yeniden çek
      // Query key isimlerini tam olarak doğru şekilde belirtelim
      await queryClient.invalidateQueries({ queryKey: ['statementTransactions', data.statement_id] });
      await queryClient.invalidateQueries({ queryKey: ['cashAccountStatementNew', data.statement_id] });
      await queryClient.invalidateQueries({ queryKey: ['accountStatements', data.account_id] });
      
      // Hesap listesini güncelleyelim
      await queryClient.invalidateQueries({ queryKey: ['cashAccounts'] });
      
      // Verilerin anında güncellenmesi için refetch işlemini zorlayalım
      await queryClient.refetchQueries({ 
        queryKey: ['statementTransactions', data.statement_id],
        exact: true 
      });
      await queryClient.refetchQueries({ 
        queryKey: ['cashAccountStatementNew', data.statement_id],
        exact: true 
      });
      
      console.log('Transaction created successfully, cache invalidated and refetched');
      
      toast({
        title: t('common:success'),
        description: t('TransactionManagement:transaction.createSuccess'),
      });
      
      return true;
    } catch (error) {
      // Tüm hata tiplerini güvenli bir şekilde işle
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error('Unexpected error in transaction creation:', error);
      
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('TransactionManagement:errors.transaction.create.failed'),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Form verilerini API formatına dönüştürür
   */
  const prepareTransactionData = (
    formData: any, 
    accountId: string, 
    statementId: string
  ): CreateTransactionData => {
    // Tarih formatı: YYYY-MM-DD
    const formattedDate = format(formData.transactionDate, 'yyyy-MM-dd');
    
    // Saat formatı: HH:MM
    const formattedTime = `${formData.transactionTime.hour}:${formData.transactionTime.minute}`;
    
    // Tutarı işle (virgülleri noktalara çevir)
    const amountString = formData.amount.replace(/\./g, '').replace(',', '.');
    const amount = parseFloat(amountString);
    
    return {
      account_id: accountId,
      statement_id: statementId,
      transaction_date: formattedDate,
      transaction_time: formattedTime,
      amount,
      transaction_type: formData.transactionType,
      description: formData.description || '',
      category_id: formData.categoryId !== 'no-category' ? formData.categoryId : undefined,
      subcategory_id: formData.subcategoryId !== 'no-subcategory' ? formData.subcategoryId : undefined
    };
  };

  return {
    handleCreateTransaction,
    prepareTransactionData,
    isSubmitting
  };
};
