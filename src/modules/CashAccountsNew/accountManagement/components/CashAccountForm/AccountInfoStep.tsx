
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const { t } = useTranslation(['AccountManagement']);
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
        <Card className="max-w-xl mx-auto shadow-sm">
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-lg">
              {t('form.steps.basicInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-3 pt-0">
            {/* Hesap Adı */}
            <FormField
              control={control}
              name="name"
              rules={{ required: t('validation.name.required') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    {t('form.name.label')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('form.name.placeholder')}
                      className="h-8 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Başlangıç Bakiyesi */}
            <FormField
              control={control}
              name="initialBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    {t('form.initialBalance.label')}
                  </FormLabel>
                  <FormControl>
                    <CurrencyInput
                      id="initialBalance"
                      value={initialBalance}
                      onChange={(value) => setValue('initialBalance', value)}
                      currency={currency}
                      wholePlaceholder={t('form.initialBalance.wholePlaceholder')}
                      decimalPlaceholder={t('form.initialBalance.decimalPlaceholder')}
                      error={errors.initialBalance?.message}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Para Birimi */}
            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    {t('form.currency.label')}
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value as CurrencyType)}
                  >
                    <FormControl>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder={t('form.currency.label')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-xs">
                      <SelectItem value={CurrencyType.TRY} className="text-xs">
                        {t('form.currency.options.try')}
                      </SelectItem>
                      <SelectItem value={CurrencyType.USD} className="text-xs">
                        {t('form.currency.options.usd')}
                      </SelectItem>
                      <SelectItem value={CurrencyType.EUR} className="text-xs">
                        {t('form.currency.options.eur')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Açıklama */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    {t('form.description.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      placeholder={t('form.description.placeholder')}
                      className="resize-none h-20 text-sm"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between py-3">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              className="h-8 text-xs px-3"
            >
              {t('form.buttons.cancel')}
            </Button>
            <Button 
              type="submit"
              className="h-8 text-xs px-3"
            >
              {t('form.buttons.next')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
