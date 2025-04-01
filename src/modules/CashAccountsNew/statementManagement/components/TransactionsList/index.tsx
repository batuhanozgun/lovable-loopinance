
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { useToast } from '@/hooks/use-toast';
import {
  EmptyTransactionsState,
  FilterDropdownMenu,
  SortDropdownMenu,
  TransactionsLoadingSkeleton,
  TransactionsTableHeader,
  TransactionRow
} from './components';
import { useTransactionsList } from '../../hooks/useTransactionsList';
import { AccountTransaction } from '../../types/transaction';
import { TransactionForm, useTransactionDeletion } from '@/modules/CashAccountsNew/transactionManagement';
import { DeleteTransactionDialog } from '@/modules/CashAccountsNew/transactionManagement/components/DeleteTransactionDialog';

interface TransactionsListProps {
  statementId: string;
  currency: CurrencyType;
  accountId: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  statementId, 
  currency,
  accountId 
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteTransaction, isDeleting } = useTransactionDeletion();
  
  // Veri çekme ve filtreleme işlemleri için kancamızı kullanıyoruz
  const { 
    data: transactions, 
    isLoading, 
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
    refreshData
  } = useTransactionsList(statementId);

  // Düzenleme işlemi için
  const handleEditTransaction = (transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    setIsEditFormOpen(true);
  };

  // Silme işlemi için
  const handleDeleteTransaction = (transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };
  
  // İşlem silme onayı
  const handleConfirmDelete = async () => {
    if (!selectedTransaction) return;
    
    const success = await deleteTransaction(selectedTransaction.id);
    if (success) {
      setIsDeleteDialogOpen(false);
      refreshData();
    }
  };
  
  // Düzenleme formunun kapatılması
  const handleCloseEditForm = (updated: boolean = false) => {
    setIsEditFormOpen(false);
    setSelectedTransaction(null);
    
    if (updated) {
      refreshData();
    }
  };

  // Yükleme durumu
  if (isLoading) {
    return <TransactionsLoadingSkeleton />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('transactions.title')}</CardTitle>
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
      
      {/* İşlem düzenleme formu */}
      {selectedTransaction && accountId && (
        <TransactionForm
          accountId={accountId}
          statementId={statementId}
          currency={currency}
          isOpen={isEditFormOpen}
          onClose={handleCloseEditForm}
          transaction={selectedTransaction}
        />
      )}
      
      {/* İşlem silme onay dialogu */}
      {selectedTransaction && (
        <DeleteTransactionDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          amount={selectedTransaction.amount}
          transactionType={selectedTransaction.transaction_type}
          currency={currency}
          description={selectedTransaction.description}
        />
      )}
    </>
  );
};
