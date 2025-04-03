
import React, { useEffect } from "react";
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
import { Transaction } from "../../types";

interface TransactionFormProps {
  accountId: string;
  statementId?: string;
  currency: string;
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction; // Düzenleme modu için
}

/**
 * İşlem formu bileşeni
 */
export const TransactionForm: React.FC<TransactionFormProps> = ({
  accountId,
  statementId,
  currency,
  isOpen,
  onClose,
  transaction
}) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
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
    toggleStatementLock,
    isEditMode
  } = useTransactionFormSetup(
    isOpen ? accountId : '',  // İletişim kutusu açıksa accountId'yi gönder
    isOpen ? statementId : undefined,  // İletişim kutusu açıksa statementId'yi gönder
    isOpen ? transaction : undefined   // İletişim kutusu açıksa transaction'ı gönder
  );
  
  // Dialog kapanırken form sıfırlama
  const handleDialogClose = () => {
    form.reset(); // Formu sıfırla
    onClose();    // Dialog'u kapat
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode 
              ? t("TransactionManagement:transaction.edit") 
              : t("TransactionManagement:transaction.new")
            }
          </DialogTitle>
        </DialogHeader>

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
          onClose={handleDialogClose}
          isEditMode={isEditMode}
        />
      </DialogContent>
    </Dialog>
  );
};
