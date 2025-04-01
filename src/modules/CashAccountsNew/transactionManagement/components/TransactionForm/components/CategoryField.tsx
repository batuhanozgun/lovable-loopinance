
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

interface CategoryFieldProps {
  control: any;
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * Kategori seçim alanı bileşeni
 */
export const CategoryField: React.FC<CategoryFieldProps> = ({ 
  control, 
  selectedCategoryId,
  onCategoryChange 
}) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const { categories, isLoading } = useCategories();

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("TransactionManagement:transaction.category")}</FormLabel>
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
                <SelectValue placeholder={t("TransactionManagement:transaction.selectCategory")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="no-category">
                {t("TransactionManagement:transaction.noCategory")}
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
