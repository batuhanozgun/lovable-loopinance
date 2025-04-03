
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
  const { t } = useTranslation(["TransactionManagement", "common"]);
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
          <FormLabel className="text-xs mb-1">{t("TransactionManagement:transaction.subcategory")}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={isDisabled}
          >
            <FormControl>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder={t("TransactionManagement:transaction.selectSubcategory")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="no-subcategory" className="text-xs">
                {t("TransactionManagement:transaction.noSubcategory")}
              </SelectItem>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id} className="text-xs">
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
};
