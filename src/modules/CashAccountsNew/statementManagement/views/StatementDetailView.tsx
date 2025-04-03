
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useStatement } from '../hooks/useStatement';
import { useCashAccount } from '@/modules/CashAccountsNew/cashAccountHomepage/hooks';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { Skeleton } from '@/components/ui/skeleton';
import { StatementDetails } from '../components/StatementDetails';
import { TransactionsList } from '../components/TransactionsList';
import { useState, useCallback, useRef } from 'react';
import { TransactionForm } from '@/modules/CashAccountsNew/transactionManagement';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Ekstre detay sayfası
 */
export const StatementDetailView: React.FC = () => {
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  const { t } = useTranslation(['StatementManagement', 'common']);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const queryClient = useQueryClient();
  const transactionsListRef = useRef<{ refetch?: () => Promise<void> }>({}); // İşlem listesi bileşenine referans
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { data: statement, isLoading: isStatementLoading, refetch: refetchStatement } = useStatement(statementId);

  // İşlem formunu açma işleyicisi
  const handleOpenTransactionForm = useCallback(() => {
    setIsTransactionFormOpen(true);
  }, []);

  // İşlem formunu kapatma işleyicisi - form kapatıldığında verileri yenile
  const handleCloseTransactionForm = useCallback(async () => {
    setIsTransactionFormOpen(false);
    
    // Form kapatıldığında tüm verileri yenileyelim
    if (statementId) {
      // Ekstre verilerini yenile
      await queryClient.refetchQueries({ 
        queryKey: ['cashAccountStatementNew', statementId],
        exact: true 
      });
      
      // Manuel olarak ekstre refetch fonksiyonunu çağıralım
      if (refetchStatement) {
        await refetchStatement();
      }
      
      // İşlem listesini yenile
      if (transactionsListRef.current && transactionsListRef.current.refetch) {
        await transactionsListRef.current.refetch();
      }
    }
  }, [statementId, queryClient, refetchStatement]);

  // İşlem listesi bileşenindeki refetch fonksiyonunu tanımlayan callback
  const setTransactionsListRefetch = useCallback((refetch: () => Promise<void>) => {
    transactionsListRef.current = { refetch };
  }, []);

  // Yükleme durumu
  if (isAccountLoading || isStatementLoading) {
    return (
      <div className="container py-4 space-y-4">
        <div className="flex items-center mb-4">
          <Skeleton className="h-8 w-20 mr-2" />
          <Skeleton className="h-6 w-48" />
        </div>
        
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>
    );
  }

  // Hesap veya ekstre bulunamama durumu
  if (!account || !statement) {
    return (
      <div className="container py-4">
        <Button variant="ghost" size="sm" asChild className="mb-3">
          <Link to={`/nakit-hesaplar/${accountId}/statements`}>
            <ArrowLeft className="mr-2 h-3 w-3" />
            {t('common:back')}
          </Link>
        </Button>
        
        <div className="p-3 border border-destructive text-destructive rounded-md text-sm">
          {!account 
            ? t('errors.account.detail.failed')
            : t('errors.statement.detail.failed')
          }
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-3">
            <Link to={`/nakit-hesaplar/${accountId}/statements`}>
              <ArrowLeft className="mr-1.5 h-3 w-3" />
              {t('common:back')}
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{account.name} - {t('statements.title')}</h1>
        </div>
        
        {/* Yeni İşlem Ekle Butonu */}
        <Button 
          onClick={handleOpenTransactionForm}
          className="flex items-center h-8 text-xs"
          size="sm"
        >
          <Plus className="h-3 w-3 mr-1.5" />
          {t('transactions.new')}
        </Button>
      </div>
      
      <StatementDetails 
        statement={statement} 
        isLoading={isStatementLoading} 
        currency={account.currency as CurrencyType} 
      />
      
      <TransactionsList 
        statementId={statementId || ''} 
        currency={account.currency as CurrencyType}
        setRefetchCallback={setTransactionsListRefetch}
      />
      
      {/* İşlem Form Dialogu */}
      {accountId && (
        <TransactionForm
          accountId={accountId}
          statementId={statementId}
          currency={account.currency}
          isOpen={isTransactionFormOpen}
          onClose={handleCloseTransactionForm}
        />
      )}
    </div>
  );
};
