
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CurrencyInput } from '../../CurrencyInput';
import { CashAccountFormSchema } from '../schema';
import { CurrencyType } from '../../../../shared/types';
import { getCurrencySymbol } from '../../../../shared/utils/currencyUtils';

interface BasicInfoStepProps {
  form: UseFormReturn<CashAccountFormSchema>;
}

/**
 * Hesap bilgileri formu adımı
 */
export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ form }) => {
  const { t } = useTranslation(['CashAccountsNew.forms']);
  const { control } = form;

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('accountForm.name.label')}</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={t('accountForm.name.placeholder')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CurrencyInput
        name="initialBalance"
        control={control}
        label={t('accountForm.initialBalance.label')}
        currencyType={form.watch('currency')}
      />

      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">{t('accountForm.currency.label')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={CurrencyType.TRY} id="currency-try" />
                  <Label htmlFor="currency-try" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.currency.options.try')} ({getCurrencySymbol(CurrencyType.TRY)})
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={CurrencyType.USD} id="currency-usd" />
                  <Label htmlFor="currency-usd" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.currency.options.usd')} ({getCurrencySymbol(CurrencyType.USD)})
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={CurrencyType.EUR} id="currency-eur" />
                  <Label htmlFor="currency-eur" className="flex-1 cursor-pointer font-normal">
                    {t('accountForm.currency.options.eur')} ({getCurrencySymbol(CurrencyType.EUR)})
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('accountForm.description.label')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('accountForm.description.placeholder')}
                className="resize-none"
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
