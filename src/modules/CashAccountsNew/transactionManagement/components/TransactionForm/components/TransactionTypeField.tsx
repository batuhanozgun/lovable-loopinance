
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TransactionType } from "../../../types";

interface TransactionTypeFieldProps {
  control: any;
}

/**
 * İşlem türü seçim alanı bileşeni (ToggleGroup kullanarak modernize edildi)
 */
export const TransactionTypeField: React.FC<TransactionTypeFieldProps> = ({ control }) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <FormField
      control={control}
      name="transactionType"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => {
                if (value) field.onChange(value);
              }}
              className="justify-start"
            >
              <ToggleGroupItem 
                value={TransactionType.INCOME} 
                aria-label={t("TransactionManagement:transaction.types.income")}
                className="flex items-center gap-1 border border-green-200 data-[state=on]:bg-green-100 data-[state=on]:text-green-700 dark:data-[state=on]:bg-green-800/30 dark:data-[state=on]:text-green-400 dark:border-green-800"
              >
                <ArrowUpCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium">
                  {t("TransactionManagement:transaction.types.income")}
                </span>
              </ToggleGroupItem>
              
              <ToggleGroupItem 
                value={TransactionType.EXPENSE} 
                aria-label={t("TransactionManagement:transaction.types.expense")}
                className="flex items-center gap-1 border border-red-200 data-[state=on]:bg-red-100 data-[state=on]:text-red-700 dark:data-[state=on]:bg-red-800/30 dark:data-[state=on]:text-red-400 dark:border-red-800"
              >
                <ArrowDownCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-xs font-medium">
                  {t("TransactionManagement:transaction.types.expense")}
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
};
