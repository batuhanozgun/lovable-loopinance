
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { StatementService } from '../services/StatementService';
import { AccountStatement } from '../types';

/**
 * Belirli bir ekstreyi getiren hook
 * @param id Ekstre ID'si
 */
export const useStatement = (id: string | undefined) => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountStatementNew', id],
    enabled: !!id,
    queryFn: async (): Promise<AccountStatement | null> => {
      if (!id) return null;
      
      const response = await StatementService.getStatementById(id);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('errors.statement.detail.failed'),
        });
        return null;
      }
      
      return response.data || null;
    }
  });
};
