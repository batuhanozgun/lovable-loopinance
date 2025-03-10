
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { CashAccountFormData, ClosingDayType, CurrencyType, CreateCashAccountData } from '../types';
import { combineAmountParts } from '../utils/amountUtils';
import { CashAccountService } from '../services/CashAccountService';
import { formLogger } from '../logging';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';

/**
 * Nakit hesap oluşturma formu için hook
 */
export const useCashAccountForm = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();
  const logger = formLogger;
  const { getCurrentUserID } = useSessionService();
  
  // Form aşaması state'i
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CashAccountFormData>({
    defaultValues: {
      name: '',
      initialBalance: {
        whole: '',
        decimal: ''
      },
      currency: CurrencyType.TRY,
      closingDayType: ClosingDayType.LAST_DAY
    }
  });
  
  // İzlenen değerler
  const closingDayType = watch('closingDayType');
  
  // Form adımları arasında geçiş
  const goToNextStep = () => setStep(2);
  const goToPreviousStep = () => setStep(1);
  
  // Form gönderimi
  const onSubmit = async (data: CashAccountFormData) => {
    try {
      setIsSubmitting(true);
      logger.debug('Submitting cash account form', { data });
      
      const userId = await getCurrentUserID();
      if (!userId) {
        throw new Error('User ID is not available');
      }
      
      // Form verilerini API formatına dönüştür
      const initialBalance = combineAmountParts(
        data.initialBalance.whole,
        data.initialBalance.decimal
      );
      
      const accountData: CreateCashAccountData = {
        user_id: userId,
        name: data.name,
        initial_balance: initialBalance,
        currency: data.currency,
        description: data.description || null,
        closing_day_type: data.closingDayType,
        closing_day_value: data.closingDayType === ClosingDayType.SPECIFIC_DAY 
          ? data.closingDayValue 
          : null
      };
      
      // Hesap oluştur
      const response = await CashAccountService.createCashAccount(accountData);
      
      if (!response.success) {
        throw new Error(response.error || t('CashAccounts:errors.account.create.failed'));
      }
      
      // Başarılı bildirim göster
      toast({
        title: t('common:success'),
        description: t('common:operationSuccessful'),
      });
      
      return response.data;
    } catch (error) {
      logger.error('Error submitting cash account form', { error });
      
      // Hata bildirimi göster
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: error instanceof Error 
          ? error.message 
          : t('CashAccounts:errors.account.create.unknownError'),
      });
      
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    step,
    isSubmitting,
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    goToNextStep,
    goToPreviousStep,
    onSubmit,
    closingDayType
  };
};
