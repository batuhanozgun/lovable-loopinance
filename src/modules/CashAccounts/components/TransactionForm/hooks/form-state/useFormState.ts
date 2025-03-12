
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { TransactionType } from "../../../../types";
import { createTransactionFormSchema, TransactionFormData } from "../../validation/schema";
import { TimeInput } from "../../types";
import { AccountTransaction } from "../../../../types";
import { serviceLogger } from "../../../../logging";

/**
 * Form durumu ve ilk değerlerini yönetmek için hook
 */
export const useFormState = (
  t: (key: string) => string,
  transaction?: AccountTransaction
) => {
  const logger = serviceLogger;
  const isEditMode = !!transaction;

  logger.debug('Setting up transaction form state', { isEditMode });
  console.log('Setting up transaction form state:', { isEditMode });

  // Form state'leri
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<TimeInput>({
    hour: format(new Date(), "HH"),
    minute: format(new Date(), "mm")
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionType: TransactionType.INCOME,
      transactionDate: new Date(),
      transactionTime: {
        hour: format(new Date(), "HH"),
        minute: format(new Date(), "mm")
      },
      categoryId: "no-category",
      subcategoryId: "no-subcategory",
    },
  });

  // Form değerlerini güncelleme
  useEffect(() => {
    form.setValue('transactionDate', date);
    form.setValue('transactionTime', time);
  }, [date, time, form]);

  // Kategori değişikliğini yönet
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("subcategoryId", "no-subcategory");
  };

  return {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    isEditMode
  };
};
