
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
 * Dakika değerini en yakın 15'in katına yuvarla
 */
const roundToNearest15Minutes = (minuteValue: number): string => {
  const roundedMinute = Math.round(minuteValue / 15) * 15;
  if (roundedMinute === 60) return '00';
  return roundedMinute.toString().padStart(2, '0');
};

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

  // Şu anki zamanı al ve dakikayı yuvarla
  const now = new Date();
  const currentHour = format(now, "HH");
  const currentMinuteValue = parseInt(format(now, "mm"));
  const roundedMinute = roundToNearest15Minutes(currentMinuteValue);

  // Form state'leri
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<TimeInput>({
    hour: currentHour,
    minute: roundedMinute
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
        hour: currentHour,
        minute: roundedMinute
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
