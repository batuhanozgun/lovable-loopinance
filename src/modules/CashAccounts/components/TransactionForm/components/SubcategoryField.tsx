
import React from "react";
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
import { SubcategoryFieldProps } from "../types";

/**
 * Alt kategori seçim alanı bileşeni
 */
export const SubcategoryField: React.FC<SubcategoryFieldProps> = ({
  control,
  selectedCategoryId,
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { categories } = useCategories();

  // Seçili kategoriye ait alt kategorileri bul
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );
  const subcategories = selectedCategory?.sub_categories || [];

  return (
    <FormField
      control={control}
      name="subcategoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("CashAccounts:transaction.subcategory")}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={!selectedCategoryId || subcategories.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("CashAccounts:transaction.selectSubcategory")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">
                {t("CashAccounts:transaction.noSubcategory")}
              </SelectItem>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
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
