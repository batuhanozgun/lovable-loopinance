
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { TransactionFilterOptions } from '../../../hooks/transactions/types';

interface TransactionTableHeaderProps {
  onSortByDate?: (order: 'asc' | 'desc') => void;
  onSortByAmount?: (order: 'asc' | 'desc') => void;
  activeFilters?: TransactionFilterOptions;
}

export const TransactionTableHeader: React.FC<TransactionTableHeaderProps> = ({
  onSortByDate,
  onSortByAmount,
  activeFilters
}) => {
  const { t } = useTranslation(['CashAccounts']);

  const renderSortOrder = (field: 'date' | 'amount') => {
    if (!activeFilters || activeFilters.sortBy !== field) return null;
    
    return activeFilters.sortOrder === 'asc' ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className={onSortByDate ? "cursor-pointer" : ""}
          onClick={onSortByDate ? () => onSortByDate(
            activeFilters?.sortBy === 'date' && activeFilters?.sortOrder === 'desc' ? 'asc' : 'desc'
          ) : undefined}
        >
          <div className="flex items-center">
            {t('CashAccounts:transaction.date')}
            {onSortByDate && (
              activeFilters?.sortBy === 'date' ? renderSortOrder('date') : <ArrowUpDown className="h-4 w-4 ml-1" />
            )}
          </div>
        </TableHead>
        <TableHead>{t('CashAccounts:transaction.description')}</TableHead>
        <TableHead>{t('CashAccounts:transaction.type')}</TableHead>
        <TableHead 
          className={`text-right ${onSortByAmount ? "cursor-pointer" : ""}`}
          onClick={onSortByAmount ? () => onSortByAmount(
            activeFilters?.sortBy === 'amount' && activeFilters?.sortOrder === 'desc' ? 'asc' : 'desc'
          ) : undefined}
        >
          <div className="flex items-center justify-end">
            {t('CashAccounts:transaction.amount')}
            {onSortByAmount && (
              activeFilters?.sortBy === 'amount' ? renderSortOrder('amount') : <ArrowUpDown className="h-4 w-4 ml-1" />
            )}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
