
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CurrencyInput } from '../CurrencyInput';
import { CurrencyType } from '../../../cashAccountHomepage/types';
import { CashAccountFormValues } from '../../types';
import { UseFormReturn } from 'react-hook-form';

interface AccountInfoStepProps {
  form: UseFormReturn<CashAccountFormValues>;
  onNext: () => void;
  onCancel: () => void;
}

/**
 * Hesap bilgilerini içeren ilk adım
 */
export const AccountInfoStep: React.FC<AccountInfoStepProps> = ({ form, onNext, onCancel }) => {
  const { t } = useTranslation(['CashAccountsNew']);
  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;

  // Sonraki adıma geçiş için doğrulama
  const handleNextStep = handleSubmit(() => {
    onNext();
  });

  // Form değerlerini izle
  const currency = watch('currency');
  const initialBalance = watch('initialBalance');

  return (
    <Form {...form}>
      <form onSubmit={handleNextStep}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {t('CashAccountsNew:accountManagement.form.steps.basicInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hesap Adı */}
            <FormField
              control={control}
              name="name"
              rules={{ required: t('CashAccountsNew:accountManagement.validation.name.required') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('CashAccountsNew:accountManagement.form.name.label')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('CashAccountsNew:accountManagement.form.name.placeholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Başlangıç Bakiyesi */}
            <FormField
              control={control}
              name="initialBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('CashAccountsNew:accountManagement.form.initialBalance.label')}
                  </FormLabel>
                  <FormControl>
                    <CurrencyInput
                      id="initialBalance"
                      value={initialBalance}
                      onChange={(value) => setValue('initialBalance', value)}
                      currency={currency}
                      wholePlaceholder={t('CashAccountsNew:accountManagement.form.initialBalance.wholePlaceholder')}
                      decimalPlaceholder={t('CashAccountsNew:accountManagement.form.initialBalance.decimalPlaceholder')}
                      error={errors.initialBalance?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Para Birimi */}
            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('CashAccountsNew:accountManagement.form.currency.label')}
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value as CurrencyType)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('CashAccountsNew:accountManagement.form.currency.label')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CurrencyType.TRY}>
                        {t('CashAccountsNew:accountManagement.form.currency.options.try')}
                      </SelectItem>
                      <SelectItem value={CurrencyType.USD}>
                        {t('CashAccountsNew:accountManagement.form.currency.options.usd')}
                      </SelectItem>
                      <SelectItem value={CurrencyType.EUR}>
                        {t('CashAccountsNew:accountManagement.form.currency.options.eur')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Açıklama */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('CashAccountsNew:accountManagement.form.description.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      placeholder={t('CashAccountsNew:accountManagement.form.description.placeholder')}
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
            >
              {t('CashAccountsNew:accountManagement.form.buttons.cancel')}
            </Button>
            <Button type="submit">
              {t('CashAccountsNew:accountManagement.form.buttons.next')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
