
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

interface DescriptionFieldProps {
  control: any;
}

/**
 * Açıklama giriş alanı bileşeni
 */
export const DescriptionField: React.FC<DescriptionFieldProps> = ({ control }) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("TransactionManagement:transaction.description")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("TransactionManagement:transaction.descriptionPlaceholder")}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
