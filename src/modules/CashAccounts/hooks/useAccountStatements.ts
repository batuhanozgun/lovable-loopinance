
import { useQuery } from '@tanstack/react-query';
import { StatementService } from '../services/statement';
import { AccountStatement, CashAccount } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

/**
 * Hesabın ekstrelerini ve ekstrelerle ilgili istatistikleri getiren hook
 */
export const useAccountStatements = (account: CashAccount | null | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  const statementsQuery = useQuery({
    queryKey: ['cashAccountStatements', account?.id],
    enabled: !!account?.id,
    queryFn: async (): Promise<AccountStatement[]> => {
      if (!account?.id) return [];
      
      const response = await StatementService.getStatementsByAccountId(account.id);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.statement.list.failed'),
        });
        return [];
      }
      
      return response.data || [];
    }
  });

  // Hesap ekstrelerinden çeşitli istatistikler hesapla
  const statistics = useMemo(() => {
    const statements = statementsQuery.data || [];
    
    const totalIncome = statements.reduce((sum, statement) => sum + Number(statement.income), 0);
    const totalExpenses = statements.reduce((sum, statement) => sum + Number(statement.expenses), 0);
    const totalBalance = statements.length > 0 ? Number(statements[0]?.end_balance || 0) : 0;
    
    const openStatements = statements.filter(s => s.status === 'open');
    const closedStatements = statements.filter(s => s.status === 'closed');
    
    const periodsCount = statements.length;
    const openPeriodsCount = openStatements.length;
    
    const openPeriodInfo = openStatements.length > 0 ? {
      id: openStatements[0].id,
      startDate: openStatements[0].start_date,
      endDate: openStatements[0].end_date,
      income: Number(openStatements[0].income),
      expenses: Number(openStatements[0].expenses),
      balance: Number(openStatements[0].end_balance),
    } : null;
    
    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      periodsCount,
      openPeriodsCount,
      closedPeriodsCount: closedStatements.length,
      openPeriodInfo,
      hasStatements: statements.length > 0,
    };
  }, [statementsQuery.data]);

  return {
    statements: statementsQuery.data,
    isLoading: statementsQuery.isLoading,
    isError: statementsQuery.isError,
    error: statementsQuery.error,
    statistics,
  };
};
