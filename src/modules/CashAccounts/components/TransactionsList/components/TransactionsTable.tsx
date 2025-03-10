
import React from 'react';
import { Table } from '@/components/ui/table';
import { TransactionTableHeader } from './TransactionTableHeader';
import { TransactionTableBody } from './TransactionTableBody';
import { AccountTransaction, CurrencyType } from '@/modules/CashAccounts/types';
import { TransactionFilterOptions } from '../../../hooks/transactions/types';

interface TransactionsTableProps {
  transactions: AccountTransaction[];
  currency: CurrencyType;
  onSortByDate?: (order: 'asc' | 'desc') => void;
  onSortByAmount?: (order: 'asc' | 'desc') => void;
  activeFilters?: TransactionFilterOptions;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  currency,
  onSortByDate,
  onSortByAmount,
  activeFilters
}) => {
  return (
    <Table>
      <TransactionTableHeader 
        onSortByDate={onSortByDate}
        onSortByAmount={onSortByAmount}
        activeFilters={activeFilters}
      />
      <TransactionTableBody 
        transactions={transactions}
        currency={currency}
      />
    </Table>
  );
};
