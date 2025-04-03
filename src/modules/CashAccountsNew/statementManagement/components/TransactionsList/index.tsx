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
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleteDialogOpen: setDeleteDialogVisibility,
    handleConfirmDelete: confirmDeleteTransaction
  } = useTransactionDelete(refetch);

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
  
  // Diyalog açıkken/kapandığında CSS sınıfını ekleyip kaldıracak useEffect hook'u
  useEffect(() => {
    if (isDeleteDialogOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      // Ek önlem olarak pointer-events'i doğrudan da ayarla
      document.body.style.pointerEvents = 'auto';
    }
  }, [isDeleteDialogOpen]);

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
        setIsOpen={setDeleteDialogVisibility}
        onConfirm={confirmDeleteTransaction}
      />
    </Card>
  );
};
