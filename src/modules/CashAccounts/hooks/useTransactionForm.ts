
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionService } from '../services/transaction';
import { CreateAccountTransactionData } from '../types';

/**
 * Hook for handling transaction form operations
 */
export const useTransactionForm = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Creates a new transaction
   */
  const handleCreateTransaction = async (data: CreateAccountTransactionData) => {
    setIsSubmitting(true);
    
    try {
      const response = await TransactionService.createTransaction(data);
      
      if (!response.success) {
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
      
      toast({
        title: t('common:success'),
        description: t('CashAccounts:transaction.createSuccess'),
      });
      
      return true;
    } catch (error) {
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

  return {
    handleCreateTransaction,
    isSubmitting
  };
};
