
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
import { AmountFieldProps } from "../types";

/**
 * Tutar giriş alanı bileşeni
 */
export const AmountField: React.FC<AmountFieldProps> = ({ control }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("CashAccounts:transaction.amount")}</FormLabel>
          <FormControl>
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
