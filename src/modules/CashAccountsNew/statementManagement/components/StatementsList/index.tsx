import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCashAccount } from '@/modules/CashAccountsNew/cashAccountHomepage/hooks/useCashAccount';
import { useStatements } from '@/modules/CashAccountsNew/statementManagement/hooks/useStatements';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { AccountStatement } from '@/modules/CashAccountsNew/statementManagement/types';
import { StatementsRefreshButton } from './components/StatementsRefreshButton';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/modules/CashAccountsNew/statementManagement/utils/currencyUtils';

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
  const { accountId } = useParams<{ accountId: string }>();
  const dateLocale = i18n.language === 'tr' ? tr : enUS;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refetch: refetchStatements } = useStatements(accountId);
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (statements.length === 0) {
    return (
      <Card>
        <CardContent className="pt-4 px-4 py-3">
          <p className="text-center text-muted-foreground text-sm">{t('statements.empty.noStatements')}</p>
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
    <div className="container py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{t('statements.title')}</h2>
        
        <div className="flex gap-2">
          {accountId && (
            <StatementsRefreshButton 
              accountId={accountId}
              onSuccess={async () => {
                await refetchStatements();
              }}
            />
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-base">{t('statements.title')}</CardTitle>
          <CardDescription className="text-xs">{t('statements.period')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">{t('statements.period')}</TableHead>
                <TableHead className="text-xs">{t('statements.endBalance')}</TableHead>
                <TableHead className="text-xs">{t('statements.status.title')}</TableHead>
                <TableHead className="text-right text-xs">{t('statements.viewDetails')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell className="py-2 text-xs">
                    {format(new Date(statement.start_date), 'PP', { locale: dateLocale })} - {format(new Date(statement.end_date), 'PP', { locale: dateLocale })}
                  </TableCell>
                  <TableCell className="py-2 text-xs">{formatCurrency(statement.end_balance, 'tr-TR', currency)}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant={getStatusBadgeVariant(statement.status)} className="text-xs py-0.5 h-5">
                      {t(`statements.status.${statement.status.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-2">
                    <Button size="sm" variant="ghost" asChild className="h-7 text-xs">
                      <Link to={`/nakit-hesaplar/${statement.account_id}/statements/${statement.id}`}>
                        <Eye className="mr-1.5 h-3 w-3" />
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
    </div>
  );
};
