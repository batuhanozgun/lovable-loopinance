
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AmountFieldProps } from "../types";
import { formatNumberForDisplay, cleanNumberInput } from "../../../utils/amountUtils";

/**
 * Tutar giriş alanı bileşeni
 */
export const AmountField: React.FC<AmountFieldProps> = ({ control, currency }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => {
        const [wholeValue, setWholeValue] = useState("");
        const [decimalValue, setDecimalValue] = useState("");

        // Form değeri değiştiğinde whole ve decimal kısımları ayrıştır
        useEffect(() => {
          if (field.value) {
            const parts = field.value.toString().split(',');
            if (parts.length > 1) {
              // Virgül ile ayrılmış değer (Türkçe format)
              setWholeValue(parts[0] ? formatNumberForDisplay(parts[0]) : "");
              setDecimalValue(parts[1] || "");
            } else {
              // Nokta ile ayrılmış veya tek parça değer
              const dotParts = field.value.toString().split('.');
              setWholeValue(dotParts[0] ? formatNumberForDisplay(dotParts[0]) : "");
              setDecimalValue(dotParts[1] || "");
            }
          }
        }, [field.value]);

        // Tam sayı kısmını değiştir ve binlikler için formatlama yap
        const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = cleanNumberInput(e.target.value); // Noktalama işaretlerini kaldır
          
          if (value === "" || /^\d+$/.test(value)) {
            const formatted = value ? formatNumberForDisplay(value) : "";
            setWholeValue(formatted);
            
            const newValue = value + (decimalValue ? `,${decimalValue}` : "");
            field.onChange(newValue || "");
          }
        };

        // Ondalık kısmını değiştir (2 basamakla sınırla)
        const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          
          if (value === "" || (/^\d{1,2}$/.test(value))) {
            setDecimalValue(value);
            
            const newValue = (wholeValue ? cleanNumberInput(wholeValue) : "0") + (value ? `,${value}` : "");
            field.onChange(newValue);
          }
        };

        // Para birimi sembolünü belirle
        const getCurrencySymbol = () => {
          switch (currency) {
            case "TRY": return "₺";
            case "USD": return "$";
            case "EUR": return "€";
            default: return "₺";
          }
        };

        return (
          <FormItem>
            <FormLabel>{t("CashAccounts:transaction.amount")}</FormLabel>
            <div className="flex items-center">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400">{getCurrencySymbol()}</span>
                </div>
                <Input
                  className="pl-8"
                  placeholder="0"
                  value={wholeValue}
                  onChange={handleWholeChange}
                  inputMode="numeric"
                />
              </div>
              <span className="mx-2 text-lg">,</span>
              <Input
                className="w-20"
                placeholder="00"
                value={decimalValue}
                onChange={handleDecimalChange}
                inputMode="numeric"
                maxLength={2}
              />
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
