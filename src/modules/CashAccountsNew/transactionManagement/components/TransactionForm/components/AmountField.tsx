
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyType } from "../../../../cashAccountHomepage/types";

interface AmountFieldProps {
  control: any;
  currency: CurrencyType;
}

/**
 * Tutar giriş alanı bileşeni
 */
export const AmountField: React.FC<AmountFieldProps> = ({ control, currency }) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs mb-1">{t("TransactionManagement:transaction.amount")}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="0,00"
                {...field}
                className="pl-7 h-8 text-xs"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground text-xs">
                {currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€"}
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
};
