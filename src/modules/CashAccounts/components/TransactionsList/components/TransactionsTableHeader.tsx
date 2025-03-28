
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const TransactionsTableHeader: React.FC = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t('transaction.date')}</TableHead>
        <TableHead>{t('transaction.type')}</TableHead>
        <TableHead>{t('transaction.description')}</TableHead>
        <TableHead className="text-right">{t('transaction.amount')}</TableHead>
        <TableHead className="text-right">{t('actions', { ns: 'common' })}</TableHead>
      </TableRow>
    </TableHeader>
  );
};
