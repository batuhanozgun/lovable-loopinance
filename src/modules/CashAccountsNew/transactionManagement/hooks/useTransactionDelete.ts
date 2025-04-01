
/**
 * İşlem silme hook'u
 */
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionDeleteService } from '../services/TransactionDeleteService';

/**
 * İşlem silme için özel hook
 */
export const useTransactionDelete = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Bir işlemi siler
   */
  const deleteTransaction = async (
    transactionId: string,
    accountId: string,
    statementId: string
  ): Promise<boolean> => {
    setIsDeleting(true);
    
    try {
      console.log('Initiating transaction deletion:', { transactionId });
      
      const response = await TransactionDeleteService.deleteTransaction(transactionId);
      
      console.log('Transaction delete service response:', response);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('TransactionManagement:errors.transaction.delete.failed')
        });
        return false;
      }
      
      // İlgili sorguları geçersiz kılarak verileri yenile
      await queryClient.invalidateQueries({ queryKey: ['statementTransactions', statementId] });
      await queryClient.invalidateQueries({ queryKey: ['statement', statementId] });
      await queryClient.invalidateQueries({ queryKey: ['statements', accountId] });
      await queryClient.refetchQueries({ queryKey: ['cashAccountsNew'] });
      
      toast({
        title: t('common:success'),
        description: t('TransactionManagement:transaction.deleteSuccess')
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error('Unexpected error deleting transaction:', error);
      
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('TransactionManagement:errors.transaction.delete.failed')
      });
      
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteTransaction,
    isDeleting
  };
};
