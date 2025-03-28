
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const TransactionsTableHeader: React.FC = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t('CashAccounts:transaction.date')}</TableHead>
        <TableHead>{t('CashAccounts:transaction.type')}</TableHead>
        <TableHead>{t('CashAccounts:transaction.description')}</TableHead>
        <TableHead className="text-right">{t('CashAccounts:transaction.amount')}</TableHead>
        <TableHead className="text-right">{t('common:actions')}</TableHead>
      </TableRow>
    </TableHeader>
  );
};
