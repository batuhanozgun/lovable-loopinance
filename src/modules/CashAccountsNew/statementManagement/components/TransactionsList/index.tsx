
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
import { 
  useTransactionsList
} from '../../hooks';
import { 
  useTransactionDelete 
} from '@/modules/CashAccountsNew/transactionManagement';
import { AccountTransaction } from '../../types/transaction';
import { DeleteTransactionDialog } from './components/DeleteTransactionDialog';

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
  
  // Silme hook'unu kullan
  const { deleteTransaction, isDeleting } = useTransactionDelete();
  
  // Veri çekme ve filtreleme işlemleri için kancamızı kullanıyoruz
  const { 
    data: transactions, 
    isLoading, 
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters
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
  
  // Silme diyalogunu kapatma
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTimeout(() => {
      // DOM'dan tamamen kaldırmak için selectedTransaction'ı gecikmeli olarak null'a ayarla
      setSelectedTransaction(null);
    }, 100);
  };
  
  // Silme onayı işlemi
  const confirmDelete = async () => {
    if (!selectedTransaction) return;
    
    try {
      // Silme işlemini başlat
      const success = await deleteTransaction(
        selectedTransaction.id,
        selectedTransaction.account_id,
        selectedTransaction.statement_id
      );
      
      // İşlem sonucuna bakılmaksızın diyaloğu kapat
      handleCloseDeleteDialog();
      
      // Başarısız olduğunda kullanıcıya bildir (toast zaten service içinde gösteriliyor)
      if (!success) {
        console.error("İşlem silme başarısız oldu");
      }
    } catch (error) {
      console.error("İşlem silme hatası:", error);
      // Hata durumunda diyaloğu kapat
      handleCloseDeleteDialog();
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
      
      {/* İşlem Silme Dialog - Sadece isDeleteDialogOpen true ise render et */}
      {isDeleteDialogOpen && selectedTransaction && (
        <DeleteTransactionDialog
          isOpen={isDeleteDialogOpen}
          isDeleting={isDeleting}
          onClose={handleCloseDeleteDialog}
          onConfirm={confirmDelete}
          transaction={selectedTransaction}
          currency={currency}
        />
      )}
    </>
  );
};
