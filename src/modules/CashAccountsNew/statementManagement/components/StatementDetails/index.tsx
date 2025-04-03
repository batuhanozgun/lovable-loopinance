
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/modules/CashAccountsNew/cashAccountHomepage/utils/currencyUtils';
import { AccountStatement } from '../../types';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface StatementDetailsProps {
  statement: AccountStatement | null;
  isLoading: boolean;
  currency: CurrencyType;
}

/**
 * Ekstre detay bileşeni
 */
export const StatementDetails: React.FC<StatementDetailsProps> = ({ statement, isLoading, currency }) => {
  const { t, i18n } = useTranslation(['StatementManagement', 'common']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;

  if (isLoading || !statement) {
    return (
      <Card>
        <CardHeader className="px-4 py-3">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'default';
      case 'CLOSED':
        return 'secondary';
      case 'FUTURE':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{t('statements.title')}</CardTitle>
            <CardDescription className="text-xs">
              {format(new Date(statement.start_date), 'PPP', { locale: dateLocale })} - {format(new Date(statement.end_date), 'PPP', { locale: dateLocale })}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(statement.status)} className="text-xs py-0.5 h-5">
            {t(`statements.status.${statement.status.toLowerCase()}`)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">{t('statements.startBalance')}</p>
            <p className="text-base font-medium">{formatCurrency(statement.start_balance, currency)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">{t('statements.endBalance')}</p>
            <p className="text-base font-medium">{formatCurrency(statement.end_balance, currency)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">{t('statements.income')}</p>
            <p className="text-base font-medium text-green-600 dark:text-green-400">{formatCurrency(statement.income, currency)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">{t('statements.expenses')}</p>
            <p className="text-base font-medium text-red-600 dark:text-red-400">{formatCurrency(statement.expenses, currency)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
