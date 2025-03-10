
import { useQuery } from '@tanstack/react-query';
import { StatementService } from '../services/StatementService';
import { AccountStatement } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Belirli bir ekstreyi getiren hook
 */
export const useStatement = (id: string | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountStatement', id],
    enabled: !!id,
    queryFn: async (): Promise<AccountStatement | null> => {
      if (!id) return null;
      
      const response = await StatementService.getStatementById(id);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.statement.detail.failed'),
        });
        return null;
      }
      
      return response.data as AccountStatement;
    }
  });
};
