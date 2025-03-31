
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { useTransactions } from '@/modules/CashAccounts/hooks/useTransactions';
import { AccountTransaction, CurrencyType } from '@/modules/CashAccounts/types';
import { 
  EmptyTransactionsState,
  FilterDropdownMenu,
  SortDropdownMenu,
  TransactionsLoadingSkeleton,
  TransactionsTableHeader,
  TransactionRow
} from '@/modules/CashAccounts/components/TransactionsList/components';
import { useToast } from '@/hooks/use-toast';

interface TransactionsListProps {
  statementId: string;
  currency: CurrencyType;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  statementId, 
  currency 
}) => {
  const { t } = useTranslation(['StatementManagement', 'CashAccounts', 'common']);
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  
  // Use the existing hook from CashAccounts module for data fetching
  const { 
    data: transactions, 
    isLoading, 
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters
  } = useTransactions(statementId);

  // Handle edit click
  const handleEditTransaction = (transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    // We'll implement the edit modal later
    toast({
      title: t('common:info'),
      description: t('common:featureComingSoon'),
    });
  };

  // Handle delete click
  const handleDeleteTransaction = (transaction: AccountTransaction) => {
    // We'll implement the delete confirmation later
    toast({
      title: t('common:info'),
      description: t('common:featureComingSoon'),
    });
  };

  // Show loading state
  if (isLoading) {
    return <TransactionsLoadingSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t('CashAccounts:transactions')}</CardTitle>
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
      <CardContent>
        {transactions && transactions.length > 0 ? (
          <Table>
            <TransactionsTableHeader />
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionRow 
                  key={transaction.id}
                  transaction={transaction} 
                  currency={currency}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyTransactionsState />
        )}
      </CardContent>
    </Card>
  );
};
