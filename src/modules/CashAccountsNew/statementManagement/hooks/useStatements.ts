
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { StatementService } from '../services/StatementService';
import { AccountStatement } from '../types';

/**
 * Belirli bir hesaba ait ekstreleri getiren hook
 */
export const useStatements = (accountId: string | undefined) => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountStatementsNew', accountId],
    enabled: !!accountId,
    queryFn: async (): Promise<AccountStatement[]> => {
      if (!accountId) return [];
      
      console.log(`[useStatementsNew] Fetching statements for account ID: ${accountId}`);
      const response = await StatementService.getStatementsByAccountId(accountId);
      
      console.log(`[useStatementsNew] Response:`, response);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('errors.statements.loadingFailed'),
        });
        return [];
      }
      
      return response.data || [];
    }
  });
};
