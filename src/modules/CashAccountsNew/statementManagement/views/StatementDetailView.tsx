
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
import { useState } from 'react';
import { TransactionForm } from '@/modules/CashAccountsNew/transactionManagement';

/**
 * Ekstre detay sayfası
 */
export const StatementDetailView: React.FC = () => {
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  const { t } = useTranslation(['StatementManagement', 'common']);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { data: statement, isLoading: isStatementLoading } = useStatement(statementId);

  // Yükleme durumu
  if (isAccountLoading || isStatementLoading) {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  // Hesap veya ekstre bulunamama durumu
  if (!account || !statement) {
    return (
      <div className="container py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to={`/nakit-hesaplar/${accountId}/statements`}>
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

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to={`/nakit-hesaplar/${accountId}/statements`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common:back')}
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{account.name} - {t('statements.title')}</h1>
        </div>
        
        {/* Add New Transaction Button */}
        <Button 
          onClick={() => setIsTransactionFormOpen(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('transactions.new')}
        </Button>
      </div>
      
      <StatementDetails 
        statement={statement} 
        isLoading={isStatementLoading} 
        currency={account.currency as CurrencyType} 
      />
      
      {/* Transaction Form Dialog */}
      {accountId && (
        <TransactionForm
          accountId={accountId}
          statementId={statementId}
          currency={account.currency}
          isOpen={isTransactionFormOpen}
          onClose={() => setIsTransactionFormOpen(false)}
        />
      )}
    </div>
  );
};
