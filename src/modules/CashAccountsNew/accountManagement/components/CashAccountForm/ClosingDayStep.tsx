
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CashAccountFormValues, ClosingDayType } from '../../types';
import { UseFormReturn } from 'react-hook-form';

interface ClosingDayStepProps {
  form: UseFormReturn<CashAccountFormValues>;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

/**
 * Hesap kesim günü seçimini içeren ikinci adım
 */
export const ClosingDayStep: React.FC<ClosingDayStepProps> = ({
  form,
  isSubmitting,
  onBack,
  onSubmit
}) => {
  const { t } = useTranslation(['CashAccountsNew']);
  const { control, watch, handleSubmit } = form;
  const closingDayType = watch('closingDayType');

  // Form gönderimi işlemi
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {t('CashAccountsNew:accountManagement.form.steps.closingDay')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hesap Kesim Günü Tipi */}
            <FormField
              control={control}
              name="closingDayType"
              rules={{ required: t('CashAccountsNew:accountManagement.validation.closingDayType.required') }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('CashAccountsNew:accountManagement.form.closingDayType.label')}
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value as ClosingDayType)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('CashAccountsNew:accountManagement.form.closingDayType.label')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ClosingDayType.LAST_DAY}>
                        {t('CashAccountsNew:accountManagement.form.closingDayType.options.lastDay')}
                      </SelectItem>
                      <SelectItem value={ClosingDayType.LAST_BUSINESS_DAY}>
                        {t('CashAccountsNew:accountManagement.form.closingDayType.options.lastBusinessDay')}
                      </SelectItem>
                      <SelectItem value={ClosingDayType.SPECIFIC_DAY}>
                        {t('CashAccountsNew:accountManagement.form.closingDayType.options.specificDay')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Belirli Gün Seçimi - sadece "Specific Day" seçildiğinde görünür */}
            {closingDayType === ClosingDayType.SPECIFIC_DAY && (
              <FormField
                control={control}
                name="closingDayValue"
                rules={{
                  required: t('CashAccountsNew:accountManagement.validation.closingDayValue.required'),
                  min: {
                    value: 1,
                    message: t('CashAccountsNew:accountManagement.validation.closingDayValue.range')
                  },
                  max: {
                    value: 28,
                    message: t('CashAccountsNew:accountManagement.validation.closingDayValue.range')
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('CashAccountsNew:accountManagement.form.closingDayValue.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={28}
                        placeholder={t('CashAccountsNew:accountManagement.form.closingDayValue.placeholder')}
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={onBack}
            >
              {t('CashAccountsNew:accountManagement.form.buttons.back')}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t('common:loading')
                : t('CashAccountsNew:accountManagement.form.buttons.create')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
