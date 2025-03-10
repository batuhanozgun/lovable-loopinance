
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { useCashAccount } from '../hooks/useCashAccount';
import { formatCurrency } from '../utils/currencyUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { CurrencyType } from '../types';

/**
 * Nakit Hesap detay sayfası
 */
export const CashAccountDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { data: account, isLoading, isError } = useCashAccount(id);

  // Yükleme durumu için iskelet
  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/cash-accounts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common:back')}
            </Link>
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  // Hata durumu
  if (isError || !account) {
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
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/cash-accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{account.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('CashAccounts:accountBalance')}</CardTitle>
            <CardDescription>{t('CashAccounts:currentBalance')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(account.initial_balance, account.currency as CurrencyType)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('CashAccounts:accountDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">{t('CashAccounts:forms.accountForm.currency')}</p>
              <p>{account.currency}</p>
            </div>
            {account.description && (
              <div>
                <p className="text-sm text-muted-foreground">{t('CashAccounts:forms.accountForm.description')}</p>
                <p>{account.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to={`/cash-accounts/${account.id}/transactions/new`}>
            <Plus className="mr-2 h-4 w-4" />
            {t('CashAccounts:newTransaction')}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/cash-accounts/${account.id}/statements`}>
            <FileText className="mr-2 h-4 w-4" />
            {t('CashAccounts:statements')}
          </Link>
        </Button>
      </div>
    </div>
  );
};
