
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/modules/CashAccountsNew/cashAccountHomepage/utils/currencyUtils';
import { AccountStatement } from '../../types';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { tr, enUS } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StatementsListProps {
  statements: AccountStatement[];
  isLoading: boolean;
  currency: CurrencyType;
}

/**
 * Ekstre listesi bileşeni
 */
export const StatementsList: React.FC<StatementsListProps> = ({ statements, isLoading, currency }) => {
  const { t, i18n } = useTranslation(['StatementManagement', 'common']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (statements.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{t('statements.empty.noStatements')}</p>
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
      <CardHeader>
        <CardTitle>{t('statements.title')}</CardTitle>
        <CardDescription>{t('statements.period')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('statements.period')}</TableHead>
              <TableHead>{t('statements.endBalance')}</TableHead>
              <TableHead>{t('statements.status.title')}</TableHead>
              <TableHead className="text-right">{t('statements.viewDetails')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statements.map((statement) => (
              <TableRow key={statement.id}>
                <TableCell>
                  {format(new Date(statement.start_date), 'PP', { locale: dateLocale })} - {format(new Date(statement.end_date), 'PP', { locale: dateLocale })}
                </TableCell>
                <TableCell>{formatCurrency(statement.end_balance, currency)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(statement.status)}>
                    {t(`statements.status.${statement.status.toLowerCase()}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/nakit-hesaplar/${statement.account_id}/statements/${statement.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      {t('statements.viewDetails')}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
