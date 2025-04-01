
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
  TransactionRow,
  DeleteTransactionDialog
} from './components';
import { useTransactionsList } from '../../hooks/useTransactionsList';
import { AccountTransaction } from '../../types/transaction';

interface TransactionsListProps {
  statementId: string;
  currency: CurrencyType;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  statementId, 
  currency 
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Veri çekme ve filtreleme işlemleri için kancamızı kullanıyoruz
  const { 
    data: transactions, 
    isLoading, 
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters,
    refetch
  } = useTransactionsList(statementId);

  // Düzenleme işlemi için
  const handleEditTransaction = (transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    // Düzenleme modalı daha sonra uygulanacak
    toast({
      title: t('common:info', { ns: 'common' }),
      description: t('common:featureComingSoon', { ns: 'common' }),
    });
  };

  // Silme işlemi için
  const handleDeleteTransaction = (transaction: AccountTransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  // Silme işlemi tamamlandıktan sonra
  const handleDeleteSuccess = () => {
    refetch();
  };
  
  // Silme iletişim kutusunu kapat
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Yükleme durumu
  if (isLoading) {
    return <TransactionsLoadingSkeleton />;
  }

  return (
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

      {/* İşlem Silme İletişim Kutusu */}
      <DeleteTransactionDialog
        transaction={selectedTransaction}
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onSuccess={handleDeleteSuccess}
      />
    </Card>
  );
};
