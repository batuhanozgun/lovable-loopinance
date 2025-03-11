
import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionFormProps } from "./types";
import { useTransactionFormSetup } from "./hooks/useTransactionFormSetup";
import { TransactionTypeField } from "./components/TransactionTypeField";
import { AmountField } from "./components/AmountField";
import { DateField } from "./components/DateField";
import { DescriptionField } from "./components/DescriptionField";
import { CategoryField } from "./components/CategoryField";
import { SubcategoryField } from "./components/SubcategoryField";
import { FormActions } from "./components/FormActions";

/**
 * İşlem formu bileşeni
 */
export const TransactionForm: React.FC<TransactionFormProps> = ({
  statementId,
  accountId,
  currency,
  isOpen,
  onClose,
  transaction
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { 
    form, 
    date, 
    setDate, 
    time, 
    setTime, 
    selectedCategoryId, 
    handleCategoryChange,
    onSubmit, 
    isSubmitting,
    isEditMode
  } = useTransactionFormSetup(
    accountId,
    statementId,
    transaction
  );

  const handleSubmit = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode 
              ? t("CashAccounts:transaction.edit") 
              : t("CashAccounts:transaction.new")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <TransactionTypeField control={form.control} />

            <div className="grid grid-cols-2 gap-4">
              <AmountField control={form.control} currency={currency} />
              <DateField 
                date={date} 
                setDate={setDate} 
                time={time} 
                setTime={setTime} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CategoryField 
                control={form.control} 
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={handleCategoryChange}
              />
              <SubcategoryField 
                control={form.control} 
                selectedCategoryId={selectedCategoryId} 
              />
            </div>

            <DescriptionField control={form.control} />

            <FormActions 
              onClose={onClose} 
              isSubmitting={isSubmitting} 
              isEditMode={isEditMode}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
