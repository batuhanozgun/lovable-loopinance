
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useStatement } from '../hooks/useStatement';
import { useCashAccount } from '../hooks/useCashAccount';
import { useTransactions } from '../hooks/useTransactions';
import { CurrencyType } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import { StatementDetails } from '../components/StatementDetails';
import { TransactionsList } from '../components/TransactionsList';

/**
 * Ekstre detay sayfası
 */
export const StatementDetailView: React.FC = () => {
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { data: statement, isLoading: isStatementLoading } = useStatement(statementId);
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactions(statementId);

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
            ? t('CashAccounts:errors.account.detail.failed')
            : t('CashAccounts:errors.statement.detail.failed')
          }
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to={`/cash-accounts/${accountId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{account.name} - {t('CashAccounts:statements')}</h1>
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
      />
    </div>
  );
};
