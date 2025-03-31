
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CashAccount } from '../types';
import { CashAccountManagementService } from '../../accountManagement/services/CashAccountManagementService';

/**
 * Belirli bir nakit hesabını ID'ye göre getiren hook
 */
export const useCashAccount = (id: string | undefined) => {
  const { t } = useTranslation(['CashAccountHomepage', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountNew', id],
    enabled: !!id,
    queryFn: async (): Promise<CashAccount | null> => {
      if (!id) return null;

      console.log(`[useCashAccount] Fetching account with ID: ${id}`);
      const response = await CashAccountManagementService.getCashAccountById(id);

      console.log(`[useCashAccount] Response:`, response);

      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('errors.account.detail.failed'),
        });
        return null;
      }

      return response.data || null;
    }
  });
};
