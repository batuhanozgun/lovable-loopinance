
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
import { TransactionTypeFieldProps } from "../types";

/**
 * İşlem türü seçim alanı bileşeni
 */
export const TransactionTypeField: React.FC<TransactionTypeFieldProps> = ({ control }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
    <FormField
      control={control}
      name="transactionType"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{t("CashAccounts:transaction.type")}</FormLabel>
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
                />
                <label
                  htmlFor="income"
                  className="text-sm font-medium leading-none cursor-pointer text-green-600 dark:text-green-400"
                >
                  {t("CashAccounts:transaction.types.income")}
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value={TransactionType.EXPENSE}
                  id="expense"
                />
                <label
                  htmlFor="expense"
                  className="text-sm font-medium leading-none cursor-pointer text-red-600 dark:text-red-400"
                >
                  {t("CashAccounts:transaction.types.expense")}
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
