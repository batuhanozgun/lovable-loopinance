
import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import { TransactionTypeField } from "./TransactionTypeField";
import { AmountField } from "./AmountField";
import { DateField } from "./DateField";
import { DescriptionField } from "./DescriptionField";
import { CategoryField } from "./CategoryField";
import { SubcategoryField } from "./SubcategoryField";
import { FormActions } from "./FormActions";
import { CurrencyType } from "../../../../cashAccountHomepage/types";

interface TransactionFormContentProps {
  form: any;
  date: Date;
  setDate: (date: Date) => void;
  time: { hour: string; minute: string };
  setTime: (time: { hour: string; minute: string }) => void;
  selectedCategoryId: string;
  handleCategoryChange: (categoryId: string) => void;
  onSubmit: (data: any) => Promise<boolean>;
  isSubmitting: boolean;
  isDisabled: boolean;
  currency: CurrencyType;
  onClose: () => void;
}

/**
 * İşlem formu içerik bileşeni
 */
export const TransactionFormContent: React.FC<TransactionFormContentProps> = ({
  form,
  date,
  setDate,
  time,
  setTime,
  selectedCategoryId,
  handleCategoryChange,
  onSubmit,
  isSubmitting,
  isDisabled,
  currency,
  onClose
}) => {
  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    
    const success = await onSubmit(data);
    console.log('Form submission result:', success);
    
    if (success) {
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {/* İşlem Tipi */}
        <TransactionTypeField control={form.control} />
        
        {/* Tarih */}
        <DateField 
          date={date} 
          setDate={setDate} 
          time={time} 
          setTime={setTime} 
        />
        
        {/* Kategori */}
        <CategoryField 
          control={form.control} 
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Alt Kategori */}
        <SubcategoryField 
          control={form.control} 
          selectedCategoryId={selectedCategoryId} 
        />
        
        {/* Tutar */}
        <AmountField control={form.control} currency={currency} />
        
        {/* Açıklama */}
        <DescriptionField control={form.control} />

        {/* Form Aksiyonları */}
        <FormActions 
          onClose={onClose} 
          isSubmitting={isSubmitting}
          isDisabled={isDisabled}
        />
      </form>
    </Form>
  );
};
