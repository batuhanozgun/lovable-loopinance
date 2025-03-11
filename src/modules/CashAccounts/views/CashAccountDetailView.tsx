
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { useCashAccount } from '../hooks/useCashAccount';
import { useAccountStatements } from '../hooks/useAccountStatements';
import { formatCurrency } from '../utils/currencyUtils';
import { CurrencyType } from '../types';
import { AccountStatementsSummary } from '../components/AccountStatementsSummary';

/**
 * Hesap detay sayfası
 */
export const CashAccountDetailView: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  const { data: account, isLoading: isAccountLoading } = useCashAccount(accountId);
  const { 
    statements, 
    isLoading: isStatementsLoading, 
    statistics 
  } = useAccountStatements(account);

  if (isAccountLoading) {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/cash-accounts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common:back')}
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{account.name}</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            asChild
            size="sm"
            variant="outline"
          >
            <Link to={`/cash-accounts/${accountId}/statements`}>
              {t('CashAccounts:account.statements')}
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">
              {t('CashAccounts:account.currentBalance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">
              {formatCurrency(Number(statistics.totalBalance), account.currency as CurrencyType)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {account.description || t('CashAccounts:account.mainAccount')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">
              {t('CashAccounts:account.totalIncome')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(Number(statistics.totalIncome), account.currency as CurrencyType)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('CashAccounts:account.allTimeIncome')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">
              {t('CashAccounts:account.totalExpenses')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(Number(statistics.totalExpenses), account.currency as CurrencyType)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('CashAccounts:account.allTimeExpenses')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <AccountStatementsSummary
        accountId={accountId || ''}
        isLoading={isStatementsLoading}
        currency={account.currency as CurrencyType}
        statistics={statistics}
      />
    </div>
  );
};
