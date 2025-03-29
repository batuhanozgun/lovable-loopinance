
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { cashAccountService } from '../../domains/accounts/application/services/CashAccountService';
import { CashAccountFormData, CashAccount, CurrencyType, ClosingDayType } from '../../shared/types';
import { uiLogger } from '../../logging';
import { useSessionUser } from '@/modules/Subscription/hooks/useSessionUser';

/**
 * Nakit hesap form yönetimi için kullanılan hook
 */
export const useCashAccountForm = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { toast } = useToast();
  const { userId } = useSessionUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form verilerini hazırla
  const getDefaultFormData = (): CashAccountFormData => ({
    name: '',
    initialBalance: {
      whole: '0',
      decimal: '00'
    },
    currency: CurrencyType.TRY,
    description: '',
    closingDayType: ClosingDayType.LAST_DAY,
    closingDayValue: undefined
  });
  
  // Hesap oluşturma fonksiyonu
  const createCashAccount = async (formData: CashAccountFormData): Promise<CashAccount | null> => {
    if (!userId) {
      setFormError(t('errors.notAuthenticated'));
      return null;
    }
    
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      // Form verilerini servise gönderilecek formata dönüştür
      const initialBalance = Number(`${formData.initialBalance.whole}.${formData.initialBalance.decimal}`);
      
      // Servise istek gönder
      const result = await cashAccountService.createCashAccount({
        user_id: userId,
        name: formData.name,
        initial_balance: initialBalance,
        currency: formData.currency,
        description: formData.description,
        closing_day_type: formData.closingDayType,
        closing_day_value: formData.closingDayValue,
      });
      
      if (!result.success) {
        const errorMessage = result.error || t('errors.account.create.failed');
        setFormError(errorMessage);
        toast({
          title: t('common:error'),
          description: errorMessage,
          variant: 'destructive',
        });
        return null;
      }
      
      toast({
        title: t('common:success'),
        description: t('accountCreated'),
      });
      
      return result.data as CashAccount;
    } catch (error) {
      uiLogger.error('Error creating cash account', error instanceof Error ? error : undefined);
      const errorMessage = 
        error instanceof Error ? error.message : t('errors.account.create.unknownError');
      
      setFormError(errorMessage);
      toast({
        title: t('common:error'),
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    defaultFormData: getDefaultFormData(),
    createCashAccount,
    isSubmitting,
    formError
  };
};
