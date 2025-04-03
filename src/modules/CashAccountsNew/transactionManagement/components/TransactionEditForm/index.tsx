
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Transaction } from "../../types";
import { useTransactionEdit } from "../../hooks/useTransactionEdit";
import { TransactionTypeField } from "../TransactionForm/components/TransactionTypeField";
import { AmountField } from "../TransactionForm/components/AmountField";
import { DateField } from "../TransactionForm/components/DateField";
import { DescriptionField } from "../TransactionForm/components/DescriptionField";
import { CategoryField } from "../TransactionForm/components/CategoryField";
import { SubcategoryField } from "../TransactionForm/components/SubcategoryField";
import { CurrencyType } from "../../../cashAccountHomepage/types";
import { FormActions } from "../TransactionForm/components/FormActions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface TransactionEditFormProps {
  transaction: Transaction;
  currency: CurrencyType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void>;
}

/**
 * İşlem düzenleme formu bileşeni
 */
export const TransactionEditForm: React.FC<TransactionEditFormProps> = ({
  transaction,
  currency,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const isMobile = useIsMobile();
  
  // Transaction düzenleme hook'u
  const {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit,
    isSubmitting
  } = useTransactionEdit(transaction, onSuccess);
  
  // Form gönderimi
  const handleSubmit = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base">
            {t("TransactionManagement:transaction.edit")}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className={isMobile ? "max-h-[65vh]" : ""}>
          <div className="pr-4">
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
                  isDisabled={false}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
