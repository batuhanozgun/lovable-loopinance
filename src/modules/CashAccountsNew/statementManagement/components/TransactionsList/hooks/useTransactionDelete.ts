
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AccountTransaction } from '../../../types/transaction';
import { StatementService } from '../../../services/StatementService';

export const useTransactionDelete = (onSuccess?: () => Promise<void>) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // İşlem silme diyaloğunu açma
  const handleDeleteTransaction = useCallback((transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  }, []);

  // Tüm verileri yenileme işlemi
  const refreshAllData = useCallback(async (statementId?: string, accountId?: string) => {
    if (!statementId) return;
    
    // İşlem listesini yenile
    if (onSuccess) {
      await onSuccess();
    }
    
    // Ekstre verilerini yenile
    await queryClient.refetchQueries({ 
      queryKey: ['cashAccountStatementNew', statementId],
      exact: true 
    });

    // Diğer ilgili verileri yenile
    if (accountId) {
      await queryClient.refetchQueries({ 
        queryKey: ['statements', accountId],
        exact: true 
      });
    }
  }, [queryClient, onSuccess]);

  // Silme işlemini onaylama
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedTransaction) return;
    
    // Önce diyaloğu kapatıp sonra silme işlemini başlatalım
    setIsDeleteDialogOpen(false);
    
    // Bir sonraki adımda UI durumunu güncelleyelim
    setIsDeleting(true);
    
    try {
      const response = await StatementService.deleteTransaction(selectedTransaction.id);
      
      if (response.success) {
        toast({
          title: t('common:success', { ns: 'common' }),
          description: t('transactions.deleteSuccess'),
        });
        
        // Tüm ilgili verileri yenile
        await refreshAllData(
          selectedTransaction.statement_id,
          selectedTransaction.account_id
        );
      } else {
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t('errors.transaction.delete.failed'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: t('common:error', { ns: 'common' }),
        description: t('errors.transaction.delete.failed'),
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  }, [selectedTransaction, toast, t, refreshAllData]);

  return {
    selectedTransaction,
    isDeleteDialogOpen,
    isDeleting,
    setIsDeleteDialogOpen,
    handleDeleteTransaction,
    handleConfirmDelete
  };
};
