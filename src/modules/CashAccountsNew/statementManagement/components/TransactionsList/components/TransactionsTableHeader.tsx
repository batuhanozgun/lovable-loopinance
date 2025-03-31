
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

/**
 * İşlemler tablosu başlık bileşeni
 */
export const TransactionsTableHeader: React.FC = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[120px]">{t('transaction.date', { ns: 'TransactionManagement' })}</TableHead>
        <TableHead className="min-w-[200px]">{t('transaction.description', { ns: 'TransactionManagement' })}</TableHead>
        <TableHead>{t('transaction.type', { ns: 'TransactionManagement' })}</TableHead>
        <TableHead className="text-right">{t('transaction.amount', { ns: 'TransactionManagement' })}</TableHead>
        <TableHead className="text-right w-[60px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
