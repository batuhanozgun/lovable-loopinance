
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCashAccount } from '../hooks/useCashAccount';
import { useStatements } from '../hooks/useStatements';
import { CurrencyType } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import { StatementsList } from '../components/StatementsList';

/**
 * Ekstre listesi sayfası
 */
export const StatementsListView: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { data: statements, isLoading: isStatementsLoading } = useStatements(accountId);

  // Yükleme durumu
  if (isAccountLoading) {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Hesap bulunamama durumu
  if (!account) {
    return (
      <div className="container py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/cash-accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {t('CashAccounts:errors.account.detail.failed')}
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
      
      <StatementsList 
        statements={statements || []} 
        isLoading={isStatementsLoading} 
        currency={account.currency as CurrencyType} 
      />
    </div>
  );
};
