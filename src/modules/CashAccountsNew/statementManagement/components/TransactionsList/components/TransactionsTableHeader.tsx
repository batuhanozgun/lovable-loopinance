
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

/**
 * İşlemler tablosu başlık bileşeni
 */
export const TransactionsTableHeader: React.FC = () => {
  const { t } = useTranslation('StatementManagement');
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[120px]">{t('common:date', { ns: 'common' })}</TableHead>
        <TableHead className="min-w-[200px]">{t('common:description', { ns: 'common' })}</TableHead>
        <TableHead>{t('common:type', { ns: 'common' })}</TableHead>
        <TableHead className="text-right">{t('common:amount', { ns: 'common' })}</TableHead>
        <TableHead className="text-right w-[60px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
