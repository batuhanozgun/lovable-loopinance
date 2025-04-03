
import React, { useEffect, useState, useCallback } from 'react';
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
  
  // İşlem silme işlemleri için kancamız - artık tüm durum yönetimi burada
  const {
    selectedTransaction,
    isDeleteDialogOpen,
    isDeleting,
    handleDeleteTransaction,
    handleCloseDeleteDialog,
    handleConfirmDelete
  } = useTransactionDelete(refetch);

  // Düzenleme işlemi için
  const handleEditTransaction = (transaction: AccountTransaction) => {
    // Düzenleme modalı daha sonra uygulanacak
    toast({
      title: t('common:info', { ns: 'common' }),
      description: t('common:featureComingSoon', { ns: 'common' }),
    });
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
    </Card>
  );
};
