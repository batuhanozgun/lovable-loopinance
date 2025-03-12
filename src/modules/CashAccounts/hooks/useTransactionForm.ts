
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
        logger.error('Transaction creation failed', { error: response.error });
        console.error('Transaction creation failed:', response.error);
        
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.create.failed'),
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
      logger.error('Unexpected error in transaction creation', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
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
        logger.error('Transaction update failed', { error: response.error });
        console.error('Transaction update failed:', response.error);
        
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.update.failed'),
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
      logger.error('Unexpected error in transaction update', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
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
