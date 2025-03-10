
import { useQuery } from '@tanstack/react-query';
import { StatementService } from '../services/StatementService';
import { AccountStatement } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Belirli bir hesaba ait ekstreleri getiren hook
 */
export const useStatements = (accountId: string | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountStatements', accountId],
    enabled: !!accountId,
    queryFn: async (): Promise<AccountStatement[]> => {
      if (!accountId) return [];
      
      const response = await StatementService.getStatementsByAccountId(accountId);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.statement.list.failed'),
        });
        return [];
      }
      
      return response.data as AccountStatement[];
    }
  });
};
