
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTransaction, CurrencyType } from '@/modules/CashAccounts/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionFilterOptions } from '../../hooks/transactions/types';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { TransactionFilters } from './components/TransactionFilters';
import { TransactionsTable } from './components/TransactionsTable';

interface TransactionsListProps {
  transactions: AccountTransaction[];
  isLoading: boolean;
  currency: CurrencyType;
  onSortByDate?: (order: 'asc' | 'desc') => void;
  onSortByAmount?: (order: 'asc' | 'desc') => void;
  onFilterByType?: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters?: () => void;
  activeFilters?: TransactionFilterOptions;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  isLoading, 
  currency,
  onSortByDate,
  onSortByAmount,
  onFilterByType,
  onResetFilters,
  activeFilters
}) => {
  const { t } = useTranslation(['CashAccounts']);
  
  if (isLoading) {
    return <LoadingState />;
  }

  if (transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('CashAccounts:transactions')}</CardTitle>
            <CardDescription>{t('CashAccounts:transaction.date')}</CardDescription>
          </div>
          
          {(onSortByDate || onSortByAmount || onFilterByType) && (
            <TransactionFilters 
              activeFilters={activeFilters}
              onSortByDate={onSortByDate}
              onSortByAmount={onSortByAmount}
              onFilterByType={onFilterByType}
              onResetFilters={onResetFilters}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <TransactionsTable 
          transactions={transactions}
          currency={currency}
          onSortByDate={onSortByDate}
          onSortByAmount={onSortByAmount}
          activeFilters={activeFilters}
        />
      </CardContent>
    </Card>
  );
};
