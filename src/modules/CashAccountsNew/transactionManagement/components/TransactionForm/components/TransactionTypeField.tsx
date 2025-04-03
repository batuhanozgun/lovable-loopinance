
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TransactionType } from "../../../types";

interface TransactionTypeFieldProps {
  control: any;
}

/**
 * İşlem türü seçim alanı bileşeni
 */
export const TransactionTypeField: React.FC<TransactionTypeFieldProps> = ({ control }) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <FormField
      control={control}
      name="transactionType"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs mb-0.5">{t("TransactionManagement:transaction.type")}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value={TransactionType.INCOME}
                  id="income"
                  className="h-3.5 w-3.5"
                />
                <label
                  htmlFor="income"
                  className="text-xs font-medium leading-none cursor-pointer text-green-600 dark:text-green-400"
                >
                  {t("TransactionManagement:transaction.types.income")}
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value={TransactionType.EXPENSE}
                  id="expense"
                  className="h-3.5 w-3.5"
                />
                <label
                  htmlFor="expense"
                  className="text-xs font-medium leading-none cursor-pointer text-red-600 dark:text-red-400"
                >
                  {t("TransactionManagement:transaction.types.expense")}
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
};
