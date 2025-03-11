
import { useQuery } from '@tanstack/react-query';
import { StatementService } from '../services/statement';
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
      
      // API çağrısını yap ve sonucu logla
      console.log(`[useStatements] Fetching statements for account ID: ${accountId}`);
      const response = await StatementService.getStatementsByAccountId(accountId);
      
      // Yanıt durumunu logla
      console.log(`[useStatements] Response:`, response);
      
      if (!response.success) {
        // Doğru çeviri anahtarını kullan
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.statements.loadingFailed'),
        });
        return [];
      }
      
      return response.data || [];
    }
  });
};
