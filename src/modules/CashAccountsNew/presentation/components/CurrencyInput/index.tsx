
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CurrencyType } from '../../../shared/types';
import { formatNumberForDisplay, cleanNumberInput } from '../../../shared/utils/amountUtils';
import { getCurrencySymbol } from '../../../shared/utils/currencyUtils';

interface CurrencyInputProps {
  name: string;
  control: any;
  label: string;
  currencyType: CurrencyType;
}

/**
 * Para birimi girişi bileşeni
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  control,
  label,
  currencyType
}) => {
  const { t } = useTranslation(['CashAccountsNew.forms']);
  const currencySymbol = getCurrencySymbol(currencyType);
  
  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <div className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute left-0 top-0 h-full flex items-center pl-3 text-muted-foreground">
            {currencySymbol}
          </div>
          <div className="flex">
            <FormField
              control={control}
              name={`${name}.whole`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('accountForm.initialBalance.wholePlaceholder')}
                      className="pl-8 pr-0 rounded-r-none border-r-0"
                      onChange={(e) => {
                        // Yalnızca sayısal değerlere izin ver ve binlik ayırıcı gösterimi kullan
                        const rawValue = e.target.value.replace(/[^0-9]/g, '');
                        if (rawValue === '') {
                          field.onChange('0');
                          return;
                        }
                        field.onChange(formatNumberForDisplay(rawValue));
                      }}
                      onBlur={(e) => {
                        // Boş değer olması durumunda "0" olarak ayarla
                        if (!field.value || field.value === '') {
                          field.onChange('0');
                        }
                        if (field.onBlur) field.onBlur(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="flex items-center justify-center px-1 border-y border-input bg-background">
              ,
            </span>
            <FormField
              control={control}
              name={`${name}.decimal`}
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('accountForm.initialBalance.decimalPlaceholder')}
                      className="rounded-l-none pl-2"
                      maxLength={2}
                      onChange={(e) => {
                        // Yalnızca sayısal değerlere ve maksimum 2 karaktere izin ver
                        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                        field.onChange(value);
                      }}
                      onBlur={(e) => {
                        // Boş değer olması durumunda "00" olarak ayarla
                        // Tek basamaklı değer olması durumunda sonuna "0" ekle
                        if (!field.value || field.value === '') {
                          field.onChange('00');
                        } else if (field.value.length === 1) {
                          field.onChange(field.value + '0');
                        }
                        if (field.onBlur) field.onBlur(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
