
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { useTransactionsList } from '../../hooks/useTransactionsList';
import { AccountTransaction } from '../../types/transaction';
import { useTransactionDelete } from './hooks/useTransactionDelete';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { 
  TransactionsHeader,
  TransactionsContent,
  TransactionsLoadingSkeleton,
  DeleteTransactionDialog
} from './components';
import { TransactionEditForm } from '../../../transactionManagement/components/TransactionEditForm';
import { Transaction, TransactionType } from '../../../transactionManagement/types';

interface TransactionsListProps {
  statementId: string;
  currency: CurrencyType;
  setRefetchCallback?: (refetch: () => Promise<void>) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  statementId, 
  currency,
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

  // Düzenleme işlemi için state
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  // Düzenleme işlemi için
  const handleEditTransaction = (transaction: AccountTransaction) => {
    // AccountTransaction tipini Transaction tipine dönüştür
    const transactionForEdit: Transaction = {
      id: transaction.id,
      account_id: transaction.account_id,
      statement_id: transaction.statement_id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type === 'income' 
        ? TransactionType.INCOME 
        : TransactionType.EXPENSE,
      transaction_date: transaction.transaction_date,
      transaction_time: transaction.transaction_time,
      description: transaction.description,
      category_id: transaction.category_id,
      subcategory_id: transaction.subcategory_id,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at
    };

    setTransactionToEdit(transactionForEdit);
    setIsEditFormOpen(true);
  };
  
  // Düzenleme formunu kapat
  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setTransactionToEdit(null);
  };
  
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
      {transactionToEdit && (
        <TransactionEditForm
          transaction={transactionToEdit}
          currency={currency}
          isOpen={isEditFormOpen}
          onClose={handleCloseEditForm}
          onSuccess={refetch}
        />
      )}
    </Card>
  );
};
