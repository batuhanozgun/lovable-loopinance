
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CashAccountFormValues, ClosingDayType, CashAccountResponse, CreateCashAccountRequest } from '../types';
import { CashAccountManagementService } from '../services/CashAccountManagementService';
import { CurrencyType } from '../../cashAccountHomepage/types';
import { combineAmountParts } from '../utils/amountUtils';

/**
 * Nakit hesap oluşturma formunu yöneten custom hook
 */
export const useCashAccountForm = () => {
  const { t } = useTranslation(['CashAccountsNew']);
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form yönetimi için react-hook-form
  const form = useForm<CashAccountFormValues>({
    defaultValues: {
      name: '',
      initialBalance: {
        whole: '',
        decimal: '00'
      },
      currency: CurrencyType.TRY,
      description: '',
      closingDayType: ClosingDayType.LAST_DAY,
      closingDayValue: undefined
    }
  });

  // Form adımları arasında geçiş
  const goToNextStep = () => {
    setStep(2);
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  // Form gönderme işlemi
  const onSubmit = async (values: CashAccountFormValues): Promise<CashAccountResponse | null> => {
    setIsSubmitting(true);

    try {
      // Form verilerini API formatına dönüştür
      const initialBalance = combineAmountParts(
        values.initialBalance.whole,
        values.initialBalance.decimal
      );

      const requestData: CreateCashAccountRequest = {
        name: values.name,
        initial_balance: initialBalance,
        currency: values.currency,
        description: values.description,
        closing_day_type: values.closingDayType,
        closing_day_value: values.closingDayType === ClosingDayType.SPECIFIC_DAY 
          ? values.closingDayValue 
          : undefined
      };

      // API çağrısı
      const response = await CashAccountManagementService.createCashAccount(requestData);

      if (response.success) {
        toast({
          title: t('CashAccountsNew:accountManagement.success.title'),
          description: t('CashAccountsNew:accountManagement.success.description'),
        });
        return response;
      } else {
        toast({
          variant: 'destructive',
          title: t('CashAccountsNew:accountManagement.errors.create.title'),
          description: response.error || t('CashAccountsNew:accountManagement.errors.create.description'),
        });
        return null;
      }
    } catch (error) {
      console.error('Error creating cash account:', error);
      toast({
        variant: 'destructive',
        title: t('CashAccountsNew:accountManagement.errors.create.title'),
        description: t('CashAccountsNew:accountManagement.errors.create.unknownError'),
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    step,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
    onSubmit,
    // Kolay erişim için form metodlarını ayrıca dışa aktar
    ...form
  };
};
