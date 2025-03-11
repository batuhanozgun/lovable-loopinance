
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/modules/Categories/hooks/queries/useCategoryQueries";
import { CategoryFieldProps } from "../types";

/**
 * Kategori seçim alanı bileşeni
 */
export const CategoryField: React.FC<CategoryFieldProps> = ({ 
  control, 
  selectedCategoryId,
  onCategoryChange 
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { categories, isLoading } = useCategories();

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("CashAccounts:transaction.category")}</FormLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onCategoryChange(value);
            }}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("CashAccounts:transaction.selectCategory")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">
                {t("CashAccounts:transaction.noCategory")}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
