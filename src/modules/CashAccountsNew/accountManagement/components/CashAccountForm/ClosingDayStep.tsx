
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const { t } = useTranslation(['AccountManagement', 'common']);
  const { control, watch, handleSubmit } = form;
  const closingDayType = watch('closingDayType');

  // Form gönderimi işlemi
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit}>
        <Card className="max-w-xl mx-auto shadow-sm">
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-lg">
              {t('form.steps.closingDay')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-3 pt-0">
            {/* Hesap Kesim Günü Tipi */}
            <FormField
              control={control}
              name="closingDayType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm">
                    {t('form.closingDayType.label')}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => field.onChange(value as ClosingDayType)}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ClosingDayType.LAST_DAY} id="last-day" />
                        <Label htmlFor="last-day" className="font-normal text-xs cursor-pointer">
                          {t('form.closingDayType.options.lastDay')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ClosingDayType.LAST_BUSINESS_DAY} id="last-business-day" />
                        <Label htmlFor="last-business-day" className="font-normal text-xs cursor-pointer">
                          {t('form.closingDayType.options.lastBusinessDay')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ClosingDayType.SPECIFIC_DAY} id="specific-day" />
                        <Label htmlFor="specific-day" className="font-normal text-xs cursor-pointer">
                          {t('form.closingDayType.options.specificDay')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Belirli Gün Seçimi - sadece "SPECIFIC_DAY" seçildiğinde görünür */}
            {closingDayType === ClosingDayType.SPECIFIC_DAY && (
              <FormField
                control={control}
                name="closingDayValue"
                rules={{
                  required: t('validation.closingDayValue.required'),
                  min: {
                    value: 1,
                    message: t('validation.closingDayValue.range')
                  },
                  max: {
                    value: 28,
                    message: t('validation.closingDayValue.range')
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      {t('form.closingDayValue.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={28}
                        placeholder={t('form.closingDayValue.placeholder')}
                        className="h-8 text-sm"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between py-3">
            <Button
              variant="outline"
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="h-8 text-xs px-3"
            >
              {t('form.buttons.back')}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="h-8 text-xs px-3"
            >
              {isSubmitting
                ? t('loading', { ns: 'common' })
                : t('form.buttons.create')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
