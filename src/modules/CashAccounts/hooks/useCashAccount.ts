
import { useQuery } from '@tanstack/react-query';
import { CashAccountService } from '../services/CashAccountService';
import { CashAccount } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Belirli bir nakit hesabı getiren hook
 */
export const useCashAccount = (id: string | undefined) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccount', id],
    enabled: !!id, // id varsa sorguyu çalıştır
    queryFn: async (): Promise<CashAccount | null> => {
      if (!id) return null;
      
      const response = await CashAccountService.getCashAccountById(id);
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccounts:errors.account.detail.failed'),
        });
        return null;
      }
      
      return response.data as CashAccount;
    }
  });
};
