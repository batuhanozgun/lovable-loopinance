
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '../CurrencyInput';
import { CashAccountFormData, CurrencyType } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface AccountInfoStepProps {
  form: UseFormReturn<CashAccountFormData>;
  onNext: () => void;
  onCancel: () => void;
}

/**
 * Hesap oluşturma formunun ilk adımı - Temel bilgiler
 */
export const AccountInfoStep: React.FC<AccountInfoStepProps> = ({ form, onNext, onCancel }) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { register, formState: { errors }, watch, setValue } = form;
  
  const initialBalance = watch('initialBalance');
  const currency = watch('currency');
  
  // Para birimi değiştiğinde güncelle
  const handleCurrencyChange = (value: CurrencyType) => {
    setValue('currency', value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('CashAccounts:forms.accountForm.steps.basicInfo')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Hesap Adı */}
          <div className="space-y-2">
            <Label htmlFor="name">
              {t('CashAccounts:forms.accountForm.name.label')}
            </Label>
            <Input
              id="name"
              placeholder={t('CashAccounts:forms.accountForm.name.placeholder')}
              className={errors.name ? 'border-red-500' : ''}
              {...register('name', { 
                required: t('CashAccounts:validation.accountForm.name.required'),
                maxLength: {
                  value: 100,
                  message: t('CashAccounts:validation.accountForm.name.maxLength')
                }
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          {/* Başlangıç Bakiyesi */}
          <CurrencyInput
            id="initialBalance"
            label={t('CashAccounts:forms.accountForm.initialBalance.label')}
            value={initialBalance}
            onChange={(value) => setValue('initialBalance', value)}
            currency={currency}
            wholePlaceholder={t('CashAccounts:forms.accountForm.initialBalance.wholePlaceholder')}
            decimalPlaceholder={t('CashAccounts:forms.accountForm.initialBalance.decimalPlaceholder')}
            error={errors.initialBalance?.message}
          />
          
          {/* Para Birimi */}
          <div className="space-y-2">
            <Label htmlFor="currency">
              {t('CashAccounts:forms.accountForm.currency.label')}
            </Label>
            <Select
              value={currency}
              onValueChange={(value) => handleCurrencyChange(value as CurrencyType)}
            >
              <SelectTrigger id="currency" className={errors.currency ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('CashAccounts:forms.accountForm.currency.label')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={CurrencyType.TRY}>
                  {t('CashAccounts:forms.accountForm.currency.options.try')}
                </SelectItem>
                <SelectItem value={CurrencyType.USD}>
                  {t('CashAccounts:forms.accountForm.currency.options.usd')}
                </SelectItem>
                <SelectItem value={CurrencyType.EUR}>
                  {t('CashAccounts:forms.accountForm.currency.options.eur')}
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.currency && (
              <p className="text-sm text-red-500">{errors.currency.message}</p>
            )}
          </div>
          
          {/* Açıklama */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {t('CashAccounts:forms.accountForm.description.label')}
            </Label>
            <Textarea
              id="description"
              placeholder={t('CashAccounts:forms.accountForm.description.placeholder')}
              className={errors.description ? 'border-red-500' : ''}
              {...register('description', { 
                maxLength: {
                  value: 250,
                  message: t('CashAccounts:validation.accountForm.description.maxLength')
                }
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          {t('CashAccounts:forms.accountForm.buttons.cancel')}
        </Button>
        <Button onClick={onNext}>
          {t('CashAccounts:forms.accountForm.buttons.next')}
        </Button>
      </CardFooter>
    </Card>
  );
};
