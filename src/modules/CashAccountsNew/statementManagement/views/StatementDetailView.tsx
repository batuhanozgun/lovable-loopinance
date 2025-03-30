
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useStatement } from '../hooks/useStatement';
import { useCashAccount } from '@/modules/CashAccountsNew/cashAccountHomepage/hooks/useCashAccounts';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { Skeleton } from '@/components/ui/skeleton';
import { StatementDetails } from '../components/StatementDetails';

/**
 * Ekstre detay sayfası
 */
export const StatementDetailView: React.FC = () => {
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  
  const { account, isLoading: isAccountLoading } = useCashAccount(accountId!);
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
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to={`/nakit-hesaplar/${accountId}/statements`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{account.name} - {t('statements.title')}</h1>
      </div>
      
      <StatementDetails 
        statement={statement} 
        isLoading={isStatementLoading} 
        currency={account.currency as CurrencyType} 
      />
    </div>
  );
};
