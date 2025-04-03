
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

  // İşlem silme diyaloğunu kapatma
  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
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
    
    // Silme işlemini başlatalım
    setIsDeleting(true);
    
    try {
      const response = await StatementService.deleteTransaction(selectedTransaction.id);
      
      if (response.success) {
        // İşlem başarıyla silindi
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
      setIsDeleteDialogOpen(false); // İşlem bittikten sonra diyaloğu kapat
      setSelectedTransaction(null); // Seçili işlemi temizle
    }
  }, [selectedTransaction, toast, t, refreshAllData]);

  return {
    selectedTransaction,
    isDeleteDialogOpen,
    isDeleting,
    handleDeleteTransaction,
    handleCloseDeleteDialog,
    handleConfirmDelete
  };
};
