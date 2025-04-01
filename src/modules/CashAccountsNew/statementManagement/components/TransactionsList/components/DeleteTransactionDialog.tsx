
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
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
import { Loader2 } from 'lucide-react';
import { StatementService } from '../../../services/StatementService';
import { AccountTransaction } from '../../../types/transaction';

interface DeleteTransactionDialogProps {
  transaction: AccountTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  transaction,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!transaction) return;
    
    setIsDeleting(true);
    
    try {
      const response = await StatementService.deleteTransaction(transaction.id);
      
      if (response.success) {
        toast({
          title: t('common:success', { ns: 'common' }),
          description: t('transactions.deleteSuccess'),
        });
        onSuccess();
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
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('transactions.deleteConfirmation.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('transactions.deleteConfirmation.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('common:cancel', { ns: 'common' })}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('transactions.deleting')}
              </>
            ) : (
              t('transactions.delete')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
