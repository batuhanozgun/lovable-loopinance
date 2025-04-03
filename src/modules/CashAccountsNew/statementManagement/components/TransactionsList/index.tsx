import React, { useState, useEffect, useCallback } from 'react';
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
import { Loader2 } from 'lucide-react';
import { StatementService } from '../../services/StatementService';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  // Tüm verileri yenileme işlemi
  const refreshAllData = useCallback(async () => {
    if (statementId) {
      // İşlem listesini yenile
      await refetch();
      
      // Ekstre verilerini yenile
      await queryClient.refetchQueries({ 
        queryKey: ['cashAccountStatementNew', statementId],
        exact: true 
      });
    }
  }, [statementId, refetch, queryClient]);

  // Silme işlemini onaylama
  const handleConfirmDelete = async () => {
    if (!selectedTransaction) return;
    
    // Önce diyaloğu kapatıp sonra silme işlemini başlatalım
    setIsDeleteDialogOpen(false);
    
    // Bir sonraki adımda UI durumunu güncelleyelim
    setIsDeleting(true);
    
    try {
      const response = await StatementService.deleteTransaction(selectedTransaction.id);
      
      if (response.success) {
        toast({
          title: t('common:success', { ns: 'common' }),
          description: t('transactions.deleteSuccess'),
        });
        
        // Tüm ilgili verileri yenile
        await refreshAllData();
      } else {
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t('errors.transaction.delete.failed'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: t('common:error', { ns: 'common' }),
        description: t('errors.transaction.delete.failed'),
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
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
        {isDeleting && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> 
            <span>{t('transactions.deleting')}</span>
          </div>
        )}
        
        {!isDeleting && transactions && transactions.length > 0 ? (
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
        ) : !isDeleting && (
          <EmptyTransactionsState />
        )}
      </CardContent>

      {/* İşlem Silme İletişim Kutusu */}
      <DeleteTransactionDialog
        transaction={selectedTransaction}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};
