
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cashAccountSchema, CashAccountFormSchema } from './schema';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { ClosingDayStep } from './steps/ClosingDayStep';
import { CashAccountFormData, CurrencyType, ClosingDayType } from '../../../shared/types';
import { uiLogger } from '../../../logging';

interface CashAccountFormProps {
  defaultValues?: Partial<CashAccountFormData>;
  onSubmit: (formData: CashAccountFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

/**
 * Nakit hesap formu bileşeni
 */
export const CashAccountForm: React.FC<CashAccountFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const { t } = useTranslation(['CashAccountsNew.forms', 'common']);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Form başlangıç değerlerini hazırla
  const formDefaultValues: CashAccountFormSchema = {
    name: defaultValues?.name || '',
    initialBalance: defaultValues?.initialBalance || { whole: '0', decimal: '00' },
    currency: defaultValues?.currency || CurrencyType.TRY,
    description: defaultValues?.description || '',
    closingDayType: defaultValues?.closingDayType || ClosingDayType.LAST_DAY,
    closingDayValue: defaultValues?.closingDayValue
  };
  
  // Form oluştur
  const form = useForm<CashAccountFormSchema>({
    resolver: zodResolver(cashAccountSchema),
    defaultValues: formDefaultValues,
    mode: 'onBlur'
  });
  
  // Form adımlarını tanımla
  const steps = [
    {
      title: t('accountForm.steps.basicInfo'),
      component: <BasicInfoStep form={form} />
    },
    {
      title: t('accountForm.steps.closingDay'),
      component: <ClosingDayStep form={form} />
    }
  ];
  
  // Sonraki adıma geç
  const handleNext = async () => {
    const fields = currentStep === 0
      ? ['name', 'initialBalance', 'currency', 'description']
      : ['closingDayType', 'closingDayValue'];
    
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  // Önceki adıma dön
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  // Formu gönder
  const handleFormSubmit = async (data: CashAccountFormSchema) => {
    uiLogger.info('Form submitted with data', { data });
    
    // Formu CashAccountFormData türüne dönüştür
    const formData: CashAccountFormData = {
      name: data.name,
      initialBalance: {
        whole: data.initialBalance.whole,
        decimal: data.initialBalance.decimal
      },
      currency: data.currency,
      description: data.description || '',
      closingDayType: data.closingDayType,
      closingDayValue: data.closingDayType === ClosingDayType.SPECIFIC_DAY ? data.closingDayValue : undefined
    };
    
    await onSubmit(formData);
  };
  
  // Mevcut adımı göster
  const currentStepContent = steps[currentStep].component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  
  return (
    <div className="w-full">
      <div className="px-0 pb-4">
        <h3 className="text-xl font-semibold leading-none tracking-tight">{t('accountForm.title')}</h3>
        <p className="text-sm text-muted-foreground mt-1">{steps[currentStep].title}</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} noValidate>
          <div className="space-y-6">
            {currentStepContent}
          </div>
          
          <div className="flex justify-between pt-6">
            {isFirstStep ? (
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('accountForm.buttons.cancel')}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={handleBack}>
                {t('accountForm.buttons.back')}
              </Button>
            )}
            
            {isLastStep ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('common:loading') : t('accountForm.buttons.create')}
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                {t('accountForm.buttons.next')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
