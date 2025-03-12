
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionService } from '../services/transaction';
import { AccountTransaction, CreateAccountTransactionData } from '../types';
import { serviceLogger } from '../logging';

/**
 * Hook for handling transaction form operations
 */
export const useTransactionForm = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logger = serviceLogger;

  /**
   * Creates a new transaction
   */
  const handleCreateTransaction = async (data: CreateAccountTransactionData) => {
    setIsSubmitting(true);
    
    logger.debug('Initiating transaction creation', { data: JSON.stringify(data) });
    console.log('Initiating transaction creation:', data);
    
    try {
      const response = await TransactionService.createTransaction(data);
      
      logger.debug('Transaction service response', { 
        success: response.success, 
        error: response.error || 'None', 
        data: response.data ? JSON.stringify(response.data) : 'None'
      });
      console.log('Transaction service response:', response);
      
      if (!response.success) {
        // Hata mesajını işleme ve görüntüleme
        let errorMessage = response.error || t('CashAccounts:errors.transaction.create.failed');
        
        // Özel hata durumlarını kontrol et
        if (response.error?.includes('statement is closed')) {
          errorMessage = t('CashAccounts:errors.transaction.create.statementClosed');
        } else if (response.error?.includes('permission') || response.error?.includes('policy')) {
          errorMessage = t('CashAccounts:errors.transaction.create.insufficientPermissions');
        } else if (response.error?.includes('statement_id')) {
          errorMessage = t('CashAccounts:errors.transaction.create.invalidStatementId');
        }
        
        logger.error('Transaction creation failed', { error: errorMessage });
        console.error('Transaction creation failed:', errorMessage);
        
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: errorMessage
        });
        return false;
      }
      
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['statementTransactions', data.statement_id] });
      queryClient.invalidateQueries({ queryKey: ['statement', data.statement_id] });
      
      logger.debug('Transaction created successfully');
      console.log('Transaction created successfully');
      
      toast({
        title: t('common:success'),
        description: t('CashAccounts:transaction.createSuccess'),
      });
      
      return true;
    } catch (error) {
      // Tüm hata tiplerini güvenli bir şekilde işle
      const isErrorObject = error instanceof Error;
      const errorMessage = isErrorObject ? error.message : (
        typeof error === 'string' ? error : t('CashAccounts:errors.transaction.create.failed')
      );
      
      logger.error('Unexpected error in transaction creation', { 
        error: errorMessage,
        stack: isErrorObject ? error.stack : 'No stack trace available'
      });
      console.error('Unexpected error in transaction creation:', error);
      
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('CashAccounts:errors.transaction.create.failed'),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Updates an existing transaction
   */
  const handleUpdateTransaction = async (transactionId: string, data: Partial<AccountTransaction>) => {
    setIsSubmitting(true);
    
    logger.debug('Initiating transaction update', { 
      id: transactionId, 
      data: JSON.stringify(data) 
    });
    console.log('Initiating transaction update:', { id: transactionId, data });
    
    try {
      const response = await TransactionService.updateTransaction(transactionId, data);
      
      logger.debug('Transaction update response', { 
        success: response.success, 
        error: response.error || 'None'
      });
      console.log('Transaction update response:', response);
      
      if (!response.success) {
        // Hata mesajını güvenli bir şekilde işle
        let errorMessage = response.error || t('CashAccounts:errors.transaction.update.failed');
        
        // Özel hata durumlarını kontrol et
        if (response.error?.includes('statement is closed')) {
          errorMessage = t('CashAccounts:errors.transaction.update.statementClosed');
        } else if (response.error?.includes('permission') || response.error?.includes('policy')) {
          errorMessage = t('CashAccounts:errors.transaction.update.insufficientPermissions');
        }
        
        logger.error('Transaction update failed', { error: errorMessage });
        console.error('Transaction update failed:', errorMessage);
        
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: errorMessage
        });
        return false;
      }
      
      // Invalidate relevant queries to refresh the data
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['statementTransactions', response.data.statement_id] });
        queryClient.invalidateQueries({ queryKey: ['statement', response.data.statement_id] });
      }
      
      logger.debug('Transaction updated successfully');
      console.log('Transaction updated successfully');
      
      toast({
        title: t('common:success'),
        description: t('CashAccounts:transaction.updateSuccess'),
      });
      
      return true;
    } catch (error) {
      // Tüm hata tiplerini güvenli bir şekilde işle
      const isErrorObject = error instanceof Error;
      const errorMessage = isErrorObject ? error.message : (
        typeof error === 'string' ? error : t('CashAccounts:errors.transaction.update.failed')
      );
      
      logger.error('Unexpected error in transaction update', { 
        error: errorMessage,
        stack: isErrorObject ? error.stack : 'No stack trace available'
      });
      console.error('Unexpected error in transaction update:', error);
      
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('CashAccounts:errors.transaction.update.failed'),
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateTransaction,
    handleUpdateTransaction,
    isSubmitting
  };
};
