
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CashAccountFormSchema } from '../schema';
import { ClosingDayType } from '../../../../shared/types';

interface ClosingDayStepProps {
  form: UseFormReturn<CashAccountFormSchema>;
}

/**
 * Hesap kesim günü adımı
 */
export const ClosingDayStep: React.FC<ClosingDayStepProps> = ({ form }) => {
  const { t } = useTranslation(['CashAccountsNew.forms']);
  const { control, watch, setValue, clearErrors } = form;
  
  const closingDayType = watch('closingDayType');
  
  // Kapanış günü tipini izle ve SPECIFIC_DAY dışındaki tipler için değeri temizle
  useEffect(() => {
    if (closingDayType !== ClosingDayType.SPECIFIC_DAY) {
      setValue('closingDayValue', null);
      clearErrors('closingDayValue');
    }
  }, [closingDayType, setValue, clearErrors]);
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="closingDayType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">{t('accountForm.closingDayType.label')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={ClosingDayType.LAST_DAY} id="last-day" />
                  <Label htmlFor="last-day" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.closingDayType.options.lastDay')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={ClosingDayType.LAST_BUSINESS_DAY} id="last-business-day" />
                  <Label htmlFor="last-business-day" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.closingDayType.options.lastBusinessDay')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={ClosingDayType.SPECIFIC_DAY} id="specific-day" />
                  <Label htmlFor="specific-day" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.closingDayType.options.specificDay')}
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {closingDayType === ClosingDayType.SPECIFIC_DAY && (
        <FormField
          control={control}
          name="closingDayValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('accountForm.closingDayValue.label')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={28}
                  placeholder={t('accountForm.closingDayValue.placeholder')}
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(isNaN(value) ? null : value);
                  }}
                  value={field.value === undefined || field.value === null ? '' : field.value}
                />
              </FormControl>
              <FormDescription>
                {t('accountForm.closingDayValue.placeholder')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
