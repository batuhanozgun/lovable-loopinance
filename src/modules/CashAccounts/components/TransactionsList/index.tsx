
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccountTransaction, CurrencyType } from '../../types';
import { TransactionForm } from '../TransactionForm';
import { DeleteTransactionDialog } from '../TransactionForm/components/DeleteTransactionDialog';

// Bileşen importları
import { TransactionsLoadingSkeleton } from './components/TransactionsLoadingSkeleton';
import { SortDropdownMenu } from './components/SortDropdownMenu';
import { FilterDropdownMenu } from './components/FilterDropdownMenu';
import { EmptyTransactionsState } from './components/EmptyTransactionsState';
import { TransactionsTable } from './components/TransactionsTable';

interface TransactionsListProps {
  transactions: AccountTransaction[];
  isLoading: boolean;
  currency: CurrencyType;
  onSortByDate: (order: 'asc' | 'desc') => void;
  onSortByAmount: (order: 'asc' | 'desc') => void;
  onFilterByType: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters: () => void;
  activeFilters: any;
  statementId: string;
  accountId: string;
  isStatementOpen?: boolean;
}

// Ana bileşen
export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  isLoading,
  currency,
  onSortByDate,
  onSortByAmount,
  onFilterByType,
  onResetFilters,
  activeFilters,
  statementId,
  accountId,
  isStatementOpen = false
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);

  // İşlem düzenleme state'i
  const [editingTransaction, setEditingTransaction] = useState<AccountTransaction | null>(null);
  
  // İşlem silme state'i
  const [deletingTransaction, setDeletingTransaction] = useState<AccountTransaction | null>(null);

  if (isLoading) {
    return <TransactionsLoadingSkeleton />;
  }

  const handleEditTransaction = (transaction: AccountTransaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = (transaction: AccountTransaction) => {
    setDeletingTransaction(transaction);
  };

  const isFilterActive = activeFilters.transactionType !== 'all';

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <span>{t('CashAccounts:transactions')}</span>
              {isFilterActive && (
                <Badge variant="outline" className="ml-2">
                  {activeFilters.transactionType === 'income' 
                    ? t('CashAccounts:filters.showingIncomeOnly') 
                    : t('CashAccounts:filters.showingExpenseOnly')}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <SortDropdownMenu 
                onSortByDate={onSortByDate} 
                onSortByAmount={onSortByAmount} 
              />
              <FilterDropdownMenu 
                onFilterByType={onFilterByType} 
                onResetFilters={onResetFilters}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <EmptyTransactionsState />
          ) : (
            <TransactionsTable 
              transactions={transactions}
              currency={currency}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          )}
        </CardContent>
      </Card>
      
      {/* İşlem düzenleme formu */}
      {editingTransaction && (
        <TransactionForm
          statementId={statementId}
          accountId={accountId}
          currency={currency}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          transaction={editingTransaction}
        />
      )}
      
      {/* İşlem silme dialogu */}
      {deletingTransaction && (
        <DeleteTransactionDialog
          isOpen={!!deletingTransaction}
          onClose={() => setDeletingTransaction(null)}
          transactionId={deletingTransaction.id}
          statementId={statementId}
        />
      )}
    </>
  );
};
