
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTransaction, CurrencyType, TransactionType } from '@/modules/CashAccounts/types';
import { formatCurrency } from '@/modules/CashAccounts/utils/currencyUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TransactionsListProps {
  transactions: AccountTransaction[];
  isLoading: boolean;
  currency: CurrencyType;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, isLoading, currency }) => {
  const { t, i18n } = useTranslation(['CashAccounts']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{t('CashAccounts:noTransactions')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('CashAccounts:transactions')}</CardTitle>
        <CardDescription>{t('CashAccounts:transaction.date')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('CashAccounts:transaction.date')}</TableHead>
              <TableHead>{t('CashAccounts:transaction.description')}</TableHead>
              <TableHead>{t('CashAccounts:transaction.type')}</TableHead>
              <TableHead className="text-right">{t('CashAccounts:transaction.amount')}</TableHead>
            </TableRow>
          </TableHeader>
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
        </Table>
      </CardContent>
    </Card>
  );
};
