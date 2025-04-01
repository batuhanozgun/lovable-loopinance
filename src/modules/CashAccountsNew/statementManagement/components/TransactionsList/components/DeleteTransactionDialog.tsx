
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { TransactionDeleteService } from '../../../services/transaction/TransactionDeleteService';
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!transaction) return;
    
    setIsDeleting(true);
    
    try {
      const response = await TransactionDeleteService.deleteTransaction(transaction.id);
      
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

  const handleCancel = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('transactions.deleteConfirmation.title')}</DialogTitle>
          <DialogDescription>
            {t('transactions.deleteConfirmation.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isDeleting}
          >
            {t('common:cancel', { ns: 'common' })}
          </Button>
          <Button 
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('transactions.deleting')}
              </>
            ) : (
              t('transactions.delete')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
