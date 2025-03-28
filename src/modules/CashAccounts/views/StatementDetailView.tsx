
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useStatement } from '../hooks/useStatement';
import { useCashAccount } from '../hooks/useCashAccount';
import { useTransactions } from '../hooks/useTransactions';
import { CurrencyType, StatementStatus } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import { StatementDetails } from '../components/StatementDetails';
import { TransactionsList } from '../components/TransactionsList';
import { TransactionForm } from '../components/TransactionForm';

/**
 * Ekstre detay sayfası
 */
export const StatementDetailView: React.FC = () => {
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  const { t } = useTranslation(['CashAccounts', 'common']);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { data: statement, isLoading: isStatementLoading } = useStatement(statementId);
  const { 
    data: transactions, 
    isLoading: isTransactionsLoading, 
    filters,
    sortByDate,
    sortByAmount,
    filterByType,
    resetFilters
  } = useTransactions(statementId);

  // Yükleme durumu
  if (isAccountLoading || isStatementLoading) {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Hesap veya ekstre bulunamama durumu
  if (!account || !statement) {
    return (
      <div className="container py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to={`/cash-accounts/${accountId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {!account 
            ? t('errors.account.detail.failed')
            : t('errors.statement.detail.failed')
          }
        </div>
      </div>
    );
  }

  // Ekstre açık mı kontrol et
  const isStatementOpen = statement.status === StatementStatus.OPEN;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to={`/cash-accounts/${accountId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common:back')}
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{account.name} - {t('statements')}</h1>
        </div>
        
        <Button 
          onClick={() => setIsTransactionFormOpen(true)} 
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('transaction.new')}
        </Button>
      </div>
      
      <StatementDetails 
        statement={statement} 
        isLoading={isStatementLoading} 
        currency={account.currency as CurrencyType} 
      />
      
      <TransactionsList 
        transactions={transactions || []}
        isLoading={isTransactionsLoading}
        currency={account.currency as CurrencyType}
        onSortByDate={sortByDate}
        onSortByAmount={sortByAmount}
        onFilterByType={filterByType}
        onResetFilters={resetFilters}
        activeFilters={filters}
        statementId={statementId || ''}
        accountId={accountId || ''}
        isStatementOpen={isStatementOpen}
      />
      
      {isTransactionFormOpen && (
        <TransactionForm
          statementId={statementId || ''}
          accountId={accountId || ''}
          currency={account.currency as CurrencyType}
          isOpen={isTransactionFormOpen}
          onClose={() => setIsTransactionFormOpen(false)}
        />
      )}
    </div>
  );
};
