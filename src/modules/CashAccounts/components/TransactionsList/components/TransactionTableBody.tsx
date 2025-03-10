
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { AccountTransaction, CurrencyType, TransactionType } from '@/modules/CashAccounts/types';
import { formatCurrency } from '@/modules/CashAccounts/utils/currencyUtils';

interface TransactionTableBodyProps {
  transactions: AccountTransaction[];
  currency: CurrencyType;
}

export const TransactionTableBody: React.FC<TransactionTableBodyProps> = ({
  transactions,
  currency
}) => {
  const { t, i18n } = useTranslation(['CashAccounts']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;

  return (
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell>
            {format(new Date(transaction.transaction_date), 'PP', { locale: dateLocale })}
          </TableCell>
          <TableCell>{transaction.description || '-'}</TableCell>
          <TableCell>
            <span 
              className={transaction.transaction_type === TransactionType.INCOME 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
              }
            >
              {t(`CashAccounts:transaction.types.${transaction.transaction_type}`)}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span 
              className={transaction.transaction_type === TransactionType.INCOME 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
              }
            >
              {formatCurrency(transaction.amount, currency)}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
