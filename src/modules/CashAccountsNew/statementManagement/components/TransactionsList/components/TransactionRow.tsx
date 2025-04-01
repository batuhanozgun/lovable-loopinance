
import React from 'react';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AccountTransaction, StatementTransactionType } from '../../../types/transaction';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

interface TransactionRowProps {
  transaction: AccountTransaction;
  currency: CurrencyType;
  onEdit: (transaction: AccountTransaction) => void;
  onDelete: (transaction: AccountTransaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  currency,
  onEdit,
  onDelete
}) => {
  const { i18n, t } = useTranslation('StatementManagement');
  const dateLocale = i18n.language === 'tr' ? tr : enUS;
  
  // Tutarı formatlama
  const formatAmount = () => {
    const formattedAmount = new Intl.NumberFormat(i18n.language, { 
      style: 'currency', 
      currency: currency 
    }).format(transaction.amount);
    
    return formattedAmount;
  };
  
  // Tarihi formatlama
  const formatDate = () => {
    const date = new Date(transaction.transaction_date);
    return format(date, 'PPP', { locale: dateLocale });
  };
  
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{formatDate()}</TableCell>
      <TableCell>
        {transaction.description || 
          <span className="text-muted-foreground italic">
            {t('common:noDescription', { ns: 'common' })}
          </span>
        }
      </TableCell>
      <TableCell>
        <Badge variant={transaction.transaction_type === StatementTransactionType.INCOME ? 'success' : 'destructive'}>
          {transaction.transaction_type === StatementTransactionType.INCOME 
            ? t('statements.income') 
            : t('statements.expenses')
          }
        </Badge>
      </TableCell>
      <TableCell className={`text-right font-medium ${
        transaction.transaction_type === StatementTransactionType.INCOME 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        {transaction.transaction_type === StatementTransactionType.INCOME ? '+' : '-'}
        {formatAmount()}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">{t('common:openMenu', { ns: 'common' })}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuItem onClick={() => onEdit(transaction)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>{t('transactions.edit')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(transaction)}
              className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>{t('transactions.delete')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
