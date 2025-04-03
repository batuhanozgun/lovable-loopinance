
import React from 'react';
import { useTranslation } from 'react-i18next';
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
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('transactions.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
