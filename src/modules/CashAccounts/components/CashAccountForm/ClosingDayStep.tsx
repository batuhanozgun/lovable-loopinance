
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { ClosingDayType, CashAccountFormData } from '../../types';
import { UseFormReturn } from 'react-hook-form';

interface ClosingDayStepProps {
  form: UseFormReturn<CashAccountFormData>;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

/**
 * Hesap oluşturma formunun ikinci adımı - Hesap kesim günü ayarları
 */
export const ClosingDayStep: React.FC<ClosingDayStepProps> = ({ 
  form, 
  isSubmitting, 
  onBack, 
  onSubmit 
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { register, watch, setValue, formState: { errors } } = form;
  
  const closingDayType = watch('closingDayType');
  
  // Hesap kesim günü türü değiştiğinde
  const handleClosingDayTypeChange = (value: ClosingDayType) => {
    setValue('closingDayType', value);
    
    // Eğer belirli bir gün seçilmediyse closingDayValue'yu temizle
    if (value !== ClosingDayType.SPECIFIC_DAY) {
      setValue('closingDayValue', undefined);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('CashAccounts:forms.accountForm.steps.closingDay')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Hesap Kesim Günü Türü */}
          <div className="space-y-2">
            <Label className="text-base">
              {t('CashAccounts:forms.accountForm.closingDayType.label')}
            </Label>
            <RadioGroup
              value={closingDayType}
              onValueChange={(value) => handleClosingDayTypeChange(value as ClosingDayType)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ClosingDayType.LAST_DAY} id="last-day" />
                <Label htmlFor="last-day" className="font-normal">
                  {t('CashAccounts:forms.accountForm.closingDayType.options.lastDay')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ClosingDayType.LAST_BUSINESS_DAY} id="last-business-day" />
                <Label htmlFor="last-business-day" className="font-normal">
                  {t('CashAccounts:forms.accountForm.closingDayType.options.lastBusinessDay')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ClosingDayType.SPECIFIC_DAY} id="specific-day" />
                <Label htmlFor="specific-day" className="font-normal">
                  {t('CashAccounts:forms.accountForm.closingDayType.options.specificDay')}
                </Label>
              </div>
            </RadioGroup>
            {errors.closingDayType && (
              <p className="text-sm text-red-500">{errors.closingDayType.message}</p>
            )}
          </div>
          
          {/* Belirli Gün seçildiyse gün değeri */}
          {closingDayType === ClosingDayType.SPECIFIC_DAY && (
            <div className="space-y-2">
              <Label htmlFor="closingDayValue">
                {t('CashAccounts:forms.accountForm.closingDayValue.label')}
              </Label>
              <Input
                id="closingDayValue"
                type="number"
                min={1}
                max={28}
                placeholder={t('CashAccounts:forms.accountForm.closingDayValue.placeholder')}
                className={errors.closingDayValue ? 'border-red-500' : ''}
                {...register('closingDayValue', {
                  required: closingDayType === ClosingDayType.SPECIFIC_DAY 
                    ? t('CashAccounts:validation.accountForm.closingDayValue.required')
                    : false,
                  min: {
                    value: 1,
                    message: t('CashAccounts:validation.accountForm.closingDayValue.range')
                  },
                  max: {
                    value: 28,
                    message: t('CashAccounts:validation.accountForm.closingDayValue.range')
                  },
                  valueAsNumber: true
                })}
              />
              {errors.closingDayValue && (
                <p className="text-sm text-red-500">{errors.closingDayValue.message}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          {t('CashAccounts:forms.accountForm.buttons.back')}
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common:processing')}
            </div>
          ) : (
            t('CashAccounts:forms.accountForm.buttons.create')
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
