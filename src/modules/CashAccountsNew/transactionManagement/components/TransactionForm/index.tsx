
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionFormSetup } from "../../hooks/useTransactionFormSetup";
import { TransactionFormProps } from "../../types";
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
  const { t } = useTranslation(["CashAccountsNew", "common"]);
  
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
    statementId: resolvedStatementId
  } = useTransactionFormSetup(
    accountId,
    statementId
  );

  // Ekstre ID'si bulunamadı uyarısı
  const noStatementWarning = !resolvedStatementId && (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
      {t("CashAccountsNew:errors.transaction.noValidStatement")}
    </div>
  );

  const handleSubmit = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      onClose();
    }
  };

  // Modal kapatıldığında formu sıfırla
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {transaction 
              ? t("CashAccountsNew:transaction.edit") 
              : t("CashAccountsNew:transaction.new")}
          </DialogTitle>
        </DialogHeader>

        {noStatementWarning}

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
              isEditMode={!!transaction}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
