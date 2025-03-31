
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

interface SubcategoryFieldProps {
  control: any;
  selectedCategoryId: string;
}

/**
 * Alt kategori seçim alanı bileşeni
 */
export const SubcategoryField: React.FC<SubcategoryFieldProps> = ({
  control,
  selectedCategoryId,
}) => {
  const { t } = useTranslation(["CashAccountsNew", "common"]);
  const { categories } = useCategories();

  // Seçili kategoriye ait alt kategorileri bul
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );
  const subcategories = selectedCategory?.sub_categories || [];
  
  // Kategori seçili değilse alt kategori seçimini devre dışı bırak
  const isDisabled = !selectedCategoryId || 
                    selectedCategoryId === "no-category" || 
                    subcategories.length === 0;

  return (
    <FormField
      control={control}
      name="subcategoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("CashAccountsNew:transaction.subcategory")}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={isDisabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("CashAccountsNew:transaction.selectSubcategory")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="no-subcategory">
                {t("CashAccountsNew:transaction.noSubcategory")}
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
