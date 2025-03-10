
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
import { DescriptionFieldProps } from "../types";

/**
 * Açıklama giriş alanı bileşeni
 */
export const DescriptionField: React.FC<DescriptionFieldProps> = ({ control }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("CashAccounts:transaction.description")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("CashAccounts:transaction.descriptionPlaceholder")}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
