
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/modules/CashAccounts/utils/currencyUtils';
import { AccountStatement, CurrencyType } from '@/modules/CashAccounts/types';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface StatementDetailsProps {
  statement: AccountStatement | null;
  isLoading: boolean;
  currency: CurrencyType;
}

export const StatementDetails: React.FC<StatementDetailsProps> = ({ statement, isLoading, currency }) => {
  const { t, i18n } = useTranslation(['CashAccounts']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;

  if (isLoading || !statement) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'open':
        return 'default';
      case 'closed':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('CashAccounts:statementDetails')}</CardTitle>
            <CardDescription>
              {format(new Date(statement.start_date), 'PPP', { locale: dateLocale })} - {format(new Date(statement.end_date), 'PPP', { locale: dateLocale })}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(statement.status)}>
            {t(`CashAccounts:status.${statement.status}`)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('CashAccounts:startBalance')}</p>
            <p className="text-xl font-medium">{formatCurrency(statement.start_balance, currency)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('CashAccounts:endBalance')}</p>
            <p className="text-xl font-medium">{formatCurrency(statement.end_balance, currency)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('CashAccounts:income')}</p>
            <p className="text-xl font-medium text-green-600 dark:text-green-400">{formatCurrency(statement.income, currency)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('CashAccounts:expenses')}</p>
            <p className="text-xl font-medium text-red-600 dark:text-red-400">{formatCurrency(statement.expenses, currency)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
