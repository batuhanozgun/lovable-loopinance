
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AccountTransaction } from '../../../types/transaction';

interface DeleteTransactionDialogProps {
  transaction: AccountTransaction | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  transaction,
  isOpen,
  setIsOpen,
  onConfirm
}) => {
  const { t } = useTranslation('StatementManagement');
  const queryClient = useQueryClient();
  
  const handleConfirmDelete = async () => {
    await onConfirm();
    
    // İşlem silindikten sonra ilgili sorguları geçersiz kıl
    if (transaction) {
      await queryClient.invalidateQueries({ queryKey: ['statementTransactions', transaction.statement_id] });
      await queryClient.invalidateQueries({ queryKey: ['statement', transaction.statement_id] });
      await queryClient.invalidateQueries({ queryKey: ['statements', transaction.account_id] });
      await queryClient.refetchQueries({ queryKey: ['cashAccountsNew'] });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('transactions.deleteConfirmation.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('transactions.deleteConfirmation.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common:cancel', { ns: 'common' })}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('transactions.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
