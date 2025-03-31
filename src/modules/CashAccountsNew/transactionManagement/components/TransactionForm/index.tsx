
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTransactionFormSetup } from "../../hooks/useTransactionFormSetup";
import { TransactionTypeField } from "./components/TransactionTypeField";
import { AmountField } from "./components/AmountField";
import { DateField } from "./components/DateField";
import { DescriptionField } from "./components/DescriptionField";
import { CategoryField } from "./components/CategoryField";
import { SubcategoryField } from "./components/SubcategoryField";
import { FormActions } from "./components/FormActions";

interface TransactionFormProps {
  accountId: string;
  statementId?: string;
  currency: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * İşlem formu bileşeni
 */
export const TransactionForm: React.FC<TransactionFormProps> = ({
  accountId,
  statementId,
  currency,
  isOpen,
  onClose
}) => {
  const { t } = useTranslation(["CashAccountsNew", "common", "errors"]);
  
  // Transaction form hook'u ile form durumunu yönet
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
    statementId: currentStatementId,
    statementError
  } = useTransactionFormSetup(accountId, statementId);

  // Form gönderildiğinde onSubmit fonksiyonunu çalıştır
  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    
    const success = await onSubmit(data);
    console.log('Form submission result:', success);
    
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {t("CashAccountsNew:transaction.new")}
          </DialogTitle>
        </DialogHeader>

        {statementError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {statementError}
            </AlertDescription>
          </Alert>
        )}

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
              isDisabled={!currentStatementId}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
