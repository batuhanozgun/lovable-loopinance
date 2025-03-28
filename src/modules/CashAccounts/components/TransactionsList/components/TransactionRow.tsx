
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Edit, 
  MoreHorizontal, 
  Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '../../../utils/currencyUtils';
import { TransactionType, AccountTransaction, CurrencyType } from '../../../types';

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
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  return (
    <TableRow key={transaction.id}>
      <TableCell className="font-medium">
        {format(new Date(transaction.transaction_date), 'dd/MM/yyyy')}
        <div className="text-xs text-muted-foreground">
          {transaction.transaction_time?.substring(0, 5)}
        </div>
      </TableCell>
      <TableCell>
        {transaction.transaction_type === TransactionType.INCOME ? (
          <div className="flex items-center text-green-500">
            <ArrowUpCircle className="mr-1 h-4 w-4" />
            {t('CashAccounts:transaction.types.income')}
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <ArrowDownCircle className="mr-1 h-4 w-4" />
            {t('CashAccounts:transaction.types.expense')}
          </div>
        )}
      </TableCell>
      <TableCell className="max-w-md truncate">
        {transaction.description || '-'}
      </TableCell>
      <TableCell className="text-right font-medium">
        <span className={transaction.transaction_type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}>
          {transaction.transaction_type === TransactionType.EXPENSE ? '- ' : '+ '}
          {formatCurrency(transaction.amount, currency)}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">{t('common:openMenu')}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(transaction)}
            >
              <Edit className="mr-2 h-4 w-4" />
              {t('common:edit')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(transaction)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('common:delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
