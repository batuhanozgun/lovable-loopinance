
import React from 'react';
import { useTranslation } from 'react-i18next';
import { tr, enUS } from 'date-fns/locale';
import { format } from 'date-fns';
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
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { AccountTransaction, StatementTransactionType } from '../../../types/transaction';

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: AccountTransaction | null;
  currency: CurrencyType;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  transaction,
  currency
}) => {
  const { i18n, t } = useTranslation(['StatementManagement', 'common']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;
  
  if (!transaction) return null;
  
  // Tutarı formatlama
  const formatAmount = () => {
    return new Intl.NumberFormat(i18n.language, { 
      style: 'currency', 
      currency: currency 
    }).format(transaction.amount);
  };
  
  // Tarihi formatlama
  const formatDate = () => {
    const date = new Date(transaction.transaction_date);
    return format(date, 'PPP', { locale: dateLocale });
  };
  
  // İşlem türüne göre metin
  const transactionTypeText = transaction.transaction_type === StatementTransactionType.INCOME
    ? t('statements.income')
    : t('statements.expenses');
  
  return (
    <AlertDialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open && !isDeleting) {
          onClose();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('transactions.delete.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('transactions.delete.description')}
            <div className="mt-4 p-4 border rounded-md bg-muted/50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">{t('transactions.date')}:</div>
                <div>{formatDate()}</div>
                
                <div className="font-medium">{t('transactions.type')}:</div>
                <div>{transactionTypeText}</div>
                
                <div className="font-medium">{t('transactions.amount')}:</div>
                <div className={transaction.transaction_type === StatementTransactionType.INCOME 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'}>
                  {formatAmount()}
                </div>
                
                {transaction.description && (
                  <>
                    <div className="font-medium">{t('transactions.description')}:</div>
                    <div>{transaction.description}</div>
                  </>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            disabled={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              if (!isDeleting) {
                onClose();
              }
            }}
          >
            {t('common:cancel', { ns: 'common' })}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting 
              ? t('common:deleting', { ns: 'common' }) 
              : t('common:delete', { ns: 'common' })
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
