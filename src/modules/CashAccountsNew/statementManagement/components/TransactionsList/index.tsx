
import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { useTransactionsList } from '../../hooks/useTransactionsList';
import { AccountTransaction } from '../../types/transaction';
import { useTransactionDelete } from './hooks/useTransactionDelete';
import { TransactionForm } from '../../../transactionManagement/components/TransactionForm';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { 
  TransactionsHeader,
  TransactionsContent,
  TransactionsLoadingSkeleton,
  DeleteTransactionDialog
} from './components';

interface TransactionsListProps {
  statementId: string;
  currency: CurrencyType;
  accountId: string; // Eklendi - işlem düzenleme için gerekli
  setRefetchCallback?: (refetch: () => Promise<void>) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  statementId, 
  currency,
  accountId, // Eklendi
  setRefetchCallback
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();

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

  // refetch fonksiyonunu üst bileşene bildiriyoruz
  useEffect(() => {
    if (setRefetchCallback && refetch) {
      setRefetchCallback(refetch);
    }
  }, [setRefetchCallback, refetch]);
  
  // İşlem silme işlemleri için kancamız
  const {
    selectedTransaction,
    isDeleteDialogOpen,
    isDeleting,
    handleDeleteTransaction,
    handleCloseDeleteDialog,
    handleConfirmDelete
  } = useTransactionDelete(refetch);

  // İşlem düzenleme durumu
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<AccountTransaction | null>(null);

  // Düzenleme işlemi için
  const handleEditTransaction = (transaction: AccountTransaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Düzenleme modalını kapatma
  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    // Modal kapandıktan sonra verileri yenile
    setTimeout(() => {
      refetch();
    }, 500);
  }, [refetch]);
  
  // Yükleme durumu
  if (isLoading) {
    return <TransactionsLoadingSkeleton />;
  }

  return (
    <Card>
      <TransactionsHeader
        filterByType={filterByType}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        resetFilters={resetFilters}
      />
      
      <TransactionsContent
        isDeleting={isDeleting}
        transactions={transactions}
        currency={currency}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />

      {/* İşlem Silme İletişim Kutusu */}
      <DeleteTransactionDialog
        transaction={selectedTransaction}
        isOpen={isDeleteDialogOpen}
        setIsOpen={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      {/* İşlem Düzenleme Formu */}
      {editingTransaction && (
        <TransactionForm
          accountId={accountId}
          statementId={statementId}
          currency={currency}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={{
            ...editingTransaction,
            // AccountTransaction tipini Transaction tipine dönüştür
            transaction_type: editingTransaction.transaction_type
          }}
        />
      )}
    </Card>
  );
};
