
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionService } from '../services/transaction';

/**
 * Hook for handling transaction mutations like delete
 */
export const useTransactionMutations = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Deletes a transaction
   */
  const handleDeleteTransaction = async (transactionId: string, statementId: string) => {
    setIsDeleting(true);
    
    try {
      const response = await TransactionService.deleteTransaction(transactionId);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.delete.failed'),
        });
        return false;
      }
      
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['statementTransactions', statementId] });
      queryClient.invalidateQueries({ queryKey: ['statement', statementId] });
      
      toast({
        title: t('common:success'),
        description: t('CashAccounts:transaction.deleteSuccess'),
      });
      
      return true;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('CashAccounts:errors.transaction.delete.failed'),
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteTransaction,
    isDeleting
  };
};
