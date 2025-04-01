
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
import { TransactionType } from '../../types';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  transactionType: TransactionType;
  currency: CurrencyType;
  description?: string;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  transactionType,
  currency,
  description
}) => {
  const { t, i18n } = useTranslation(['TransactionManagement', 'common']);
  
  // Tutarı formatlama
  const formattedAmount = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: currency
  }).format(amount);
  
  // İşlem tipine göre renk ve metin
  const typeText = transactionType === TransactionType.INCOME 
    ? t('transaction.types.income') 
    : t('transaction.types.expense');
  
  // İşlem açıklaması veya varsayılan metin
  const transactionDescription = description || t('transaction.noDescription');
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('transaction.delete.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('transaction.delete.confirmation')}
            <div className="mt-4 p-4 border rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{t('transaction.type')}:</span>
                <span className={`${
                  transactionType === TransactionType.INCOME 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {typeText}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{t('transaction.amount')}:</span>
                <span className={`${
                  transactionType === TransactionType.INCOME 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transactionType === TransactionType.INCOME ? '+' : '-'}{formattedAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('transaction.description')}:</span>
                <span className="text-muted-foreground max-w-[200px] truncate">
                  {transactionDescription}
                </span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            {t('transaction.delete.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
