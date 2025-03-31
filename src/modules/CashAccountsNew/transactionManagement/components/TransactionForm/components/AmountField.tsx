
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
          <FormLabel>{t("TransactionManagement:transaction.amount")}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="0,00"
                {...field}
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                {currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€"}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
