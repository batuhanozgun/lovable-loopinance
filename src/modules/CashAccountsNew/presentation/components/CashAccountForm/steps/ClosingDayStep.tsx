
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      setValue('closingDayValue', undefined);
      clearErrors('closingDayValue');
    }
  }, [closingDayType, setValue, clearErrors]);
  
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="closingDayType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('accountForm.closingDayType.label')}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('accountForm.closingDayType.label')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={ClosingDayType.LAST_DAY}>
                  {t('accountForm.closingDayType.options.lastDay')}
                </SelectItem>
                <SelectItem value={ClosingDayType.LAST_BUSINESS_DAY}>
                  {t('accountForm.closingDayType.options.lastBusinessDay')}
                </SelectItem>
                <SelectItem value={ClosingDayType.SPECIFIC_DAY}>
                  {t('accountForm.closingDayType.options.specificDay')}
                </SelectItem>
              </SelectContent>
            </Select>
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
                    field.onChange(isNaN(value) ? undefined : value);
                  }}
                  value={field.value === undefined ? '' : field.value}
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
