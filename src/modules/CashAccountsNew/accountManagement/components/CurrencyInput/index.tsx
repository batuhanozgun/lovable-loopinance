
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CurrencyType } from '../../../cashAccountHomepage/types';

interface CurrencyInputProps {
  id: string;
  label?: string;
  value: {
    whole: string;
    decimal: string;
  };
  onChange: (value: { whole: string; decimal: string }) => void;
  currency: CurrencyType;
  wholePlaceholder?: string;
  decimalPlaceholder?: string;
  error?: string;
}

/**
 * Para birimi girişi için özel input bileşeni
 * Tam sayı ve ondalık kısım için ayrı inputlar sağlar
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  label,
  value,
  onChange,
  currency,
  wholePlaceholder = '0',
  decimalPlaceholder = '00',
  error,
}) => {
  const [wholeValue, setWholeValue] = useState(value.whole);
  const [decimalValue, setDecimalValue] = useState(value.decimal);

  // Dışarıdan değer değiştiğinde state'i güncelle
  useEffect(() => {
    setWholeValue(value.whole);
    setDecimalValue(value.decimal);
  }, [value.whole, value.decimal]);

  // Tam sayı kısmında otomatik binlik ayırıcı formatlama
  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Tüm nokta ve virgülleri kaldır ve sadece sayıları al
    const rawValue = e.target.value.replace(/[.,\s]/g, '');
    
    if (rawValue === '') {
      setWholeValue('');
      onChange({ whole: '', decimal: decimalValue });
      return;
    }
    
    // Sadece sayısal değer kontrolü
    if (!/^\d*$/.test(rawValue)) {
      return;
    }
    
    // Sayıyı binlik ayırıcılarla formatla
    const formattedValue = Number(rawValue).toLocaleString('tr-TR');
    setWholeValue(formattedValue);
    
    // Parent'a ham değeri gönder
    onChange({ whole: rawValue, decimal: decimalValue });
  };

  // Ondalık kısım için değişiklik işleyicisi
  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // 2 basamaktan fazla girilmesini engelle ve sadece sayı kontrolü
    if (rawValue.length > 2 || (rawValue !== '' && !/^\d{1,2}$/.test(rawValue))) {
      return;
    }
    
    setDecimalValue(rawValue);
    onChange({ whole: wholeValue.replace(/[.,\s]/g, ''), decimal: rawValue });
  };

  // Para birimi sembolünü al
  const getCurrencySymbol = (currency: CurrencyType) => {
    switch (currency) {
      case CurrencyType.TRY:
        return '₺';
      case CurrencyType.USD:
        return '$';
      case CurrencyType.EUR:
        return '€';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={id} className="block text-xs font-medium">
          {label}
        </Label>
      )}
      <div className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-xs">{getCurrencySymbol(currency)}</span>
          </div>
          <Input
            id={id}
            type="text"
            inputMode="numeric"
            className={`pl-6 h-8 text-sm ${error ? 'border-red-500' : ''}`}
            value={wholeValue}
            onChange={handleWholeChange}
            placeholder={wholePlaceholder}
          />
        </div>
        <span className="mx-1 text-base">,</span>
        <Input
          type="text"
          inputMode="numeric"
          className={`w-16 h-8 text-sm ${error ? 'border-red-500' : ''}`}
          value={decimalValue}
          onChange={handleDecimalChange}
          placeholder={decimalPlaceholder}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
