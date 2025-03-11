
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CurrencyType } from '../../types';
import { formatCurrency } from '../../utils/currencyUtils';
import { ArrowRightCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccountStatementsSummaryProps {
  accountId: string;
  isLoading: boolean;
  currency: CurrencyType;
  statistics: {
    totalIncome: number;
    totalExpenses: number;
    totalBalance: number;
    periodsCount: number;
    openPeriodsCount: number;
    closedPeriodsCount: number;
    openPeriodInfo: {
      id: string;
      startDate: string;
      endDate: string;
      income: number;
      expenses: number;
      balance: number;
    } | null;
    hasStatements: boolean;
  };
}

export const AccountStatementsSummary: React.FC<AccountStatementsSummaryProps> = ({
  accountId,
  isLoading,
  currency,
  statistics
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    );
  }

  if (!statistics.hasStatements) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('CashAccounts:statements.summary.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-6 text-center">
            <h3 className="text-lg font-medium">{t('CashAccounts:statements.noStatements')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('CashAccounts:statements.createInfoMessage')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('CashAccounts:statements.summary.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{t('CashAccounts:statements.totalBalance')}</h3>
            <p className="text-2xl font-bold">{formatCurrency(statistics.totalBalance, currency)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t('CashAccounts:statements.totalIncome')}</h4>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(statistics.totalIncome, currency)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t('CashAccounts:statements.totalExpenses')}</h4>
              <p className="text-lg font-semibold text-red-600">{formatCurrency(statistics.totalExpenses, currency)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{t('CashAccounts:statements.periods')}</h3>
            <div className="mt-1 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md bg-muted p-2">
                <p className="text-xl font-bold">{statistics.periodsCount}</p>
                <p className="text-xs text-muted-foreground">{t('CashAccounts:statements.totalPeriods')}</p>
              </div>
              <div className="rounded-md bg-green-100 p-2">
                <p className="text-xl font-bold text-green-700">{statistics.openPeriodsCount}</p>
                <p className="text-xs text-muted-foreground">{t('CashAccounts:statements.openPeriods')}</p>
              </div>
              <div className="rounded-md bg-blue-100 p-2">
                <p className="text-xl font-bold text-blue-700">{statistics.closedPeriodsCount}</p>
                <p className="text-xs text-muted-foreground">{t('CashAccounts:statements.closedPeriods')}</p>
              </div>
            </div>
          </div>
          
          {statistics.openPeriodInfo && (
            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium">{t('CashAccounts:statements.currentPeriod')}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {statistics.openPeriodInfo.startDate} - {statistics.openPeriodInfo.endDate}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">{t('CashAccounts:statements.income')}</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(statistics.openPeriodInfo.income, currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t('CashAccounts:statements.expenses')}</p>
                  <p className="text-sm font-semibold text-red-600">
                    {formatCurrency(statistics.openPeriodInfo.expenses, currency)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <Link to={`/cash-accounts/${accountId}/statements`}>
            {t('CashAccounts:statements.viewAll')}
            <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
