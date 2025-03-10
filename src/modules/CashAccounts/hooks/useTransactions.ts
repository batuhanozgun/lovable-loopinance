
import { useQuery } from '@tanstack/react-query';
import { TransactionService } from '../services/TransactionService';
import { AccountTransaction } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Belirli bir ekstrenin işlemlerini getiren hook
 */
export const useTransactions = (statementId: string | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['statementTransactions', statementId],
    enabled: !!statementId,
    queryFn: async (): Promise<AccountTransaction[]> => {
      if (!statementId) return [];
      
      const response = await TransactionService.getTransactionsByStatementId(statementId);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.transaction.list.failed'),
        });
        return [];
      }
      
      return response.data as AccountTransaction[];
    }
  });
};
