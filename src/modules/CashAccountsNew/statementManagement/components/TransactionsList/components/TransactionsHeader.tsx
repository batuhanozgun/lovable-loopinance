
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { FilterDropdownMenu } from './FilterDropdownMenu';
import { SortDropdownMenu } from './SortDropdownMenu';
import { StatementTransactionType } from '../../../types/transaction';

interface TransactionsHeaderProps {
  filterByType: (type: StatementTransactionType | 'all') => void;
  sortByDate: (direction: 'asc' | 'desc') => void;
  sortByAmount: (direction: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

export const TransactionsHeader: React.FC<TransactionsHeaderProps> = ({
  filterByType,
  sortByDate,
  sortByAmount,
  resetFilters
}) => {
  const { t } = useTranslation('StatementManagement');

  return (
    <CardHeader className="px-4 py-3">
      <div className="flex justify-between items-center">
        <CardTitle className="text-base">{t('transactions.title')}</CardTitle>
        <div className="flex space-x-2">
          <FilterDropdownMenu 
            onFilterByType={filterByType}
            onResetFilters={resetFilters}
          />
          <SortDropdownMenu 
            onSortByDate={sortByDate}
            onSortByAmount={sortByAmount}
          />
        </div>
      </div>
    </CardHeader>
  );
};
