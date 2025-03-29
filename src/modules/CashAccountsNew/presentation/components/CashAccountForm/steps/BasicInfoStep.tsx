
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput } from '../../CurrencyInput';
import { CashAccountFormSchema } from '../schema';
import { CurrencyType } from '../../../../shared/types';

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
    <div className="space-y-4">
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
          <FormItem>
            <FormLabel>{t('accountForm.currency.label')}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('accountForm.currency.label')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={CurrencyType.TRY}>
                  {t('accountForm.currency.options.try')}
                </SelectItem>
                <SelectItem value={CurrencyType.USD}>
                  {t('accountForm.currency.options.usd')}
                </SelectItem>
                <SelectItem value={CurrencyType.EUR}>
                  {t('accountForm.currency.options.eur')}
                </SelectItem>
              </SelectContent>
            </Select>
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
