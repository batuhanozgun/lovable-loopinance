
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionFormSetup } from "../../hooks/useTransactionFormSetup";
import { CurrencyType } from "../../../cashAccountHomepage/types";
import { StatementInfoSection } from "./components/StatementInfoSection";
import { TransactionFormContent } from "./components/TransactionFormContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const isMobile = useIsMobile();
  
  // string tipindeki currency'i CurrencyType enum'una dönüştür
  const currencyType = currency as CurrencyType;
  
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
    statement: currentStatement,
    isLoadingStatement,
    statementError,
    lockStatement,
    toggleStatementLock
  } = useTransactionFormSetup(accountId, statementId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base">
            {t("TransactionManagement:transaction.new")}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className={isMobile ? "max-h-[calc(85vh-80px)]" : ""}>
          <div className="pr-4">
            {/* Ekstre Bilgileri Bölümü */}
            <StatementInfoSection 
              currencyType={currencyType}
              statementId={statementId}
              currentStatement={currentStatement}
              isLoadingStatement={isLoadingStatement}
              statementError={statementError}
              lockStatement={lockStatement}
              toggleStatementLock={toggleStatementLock}
            />

            {/* İşlem Formu İçerik Bölümü */}
            <TransactionFormContent 
              form={form}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              selectedCategoryId={selectedCategoryId}
              handleCategoryChange={handleCategoryChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              isDisabled={!currentStatementId}
              currency={currencyType}
              onClose={onClose}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
