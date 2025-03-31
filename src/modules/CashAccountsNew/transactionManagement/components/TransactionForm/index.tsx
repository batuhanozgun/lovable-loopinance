
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
import { AlertCircle, Calendar, InfoIcon, LockIcon, UnlockIcon } from "lucide-react";
import { useTransactionFormSetup } from "../../hooks/useTransactionFormSetup";
import { TransactionTypeField } from "./components/TransactionTypeField";
import { AmountField } from "./components/AmountField";
import { DateField } from "./components/DateField";
import { DescriptionField } from "./components/DescriptionField";
import { CategoryField } from "./components/CategoryField";
import { SubcategoryField } from "./components/SubcategoryField";
import { FormActions } from "./components/FormActions";
import { StatementWarning } from "./components/StatementWarning";
import { formatCurrency } from "../../../cashAccountHomepage/utils/currencyUtils";
import { CurrencyType } from "../../../cashAccountHomepage/types";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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

        {!statementError && (
          <div className="mb-4 p-3 border rounded-md bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <h3 className="text-sm font-medium">{t("CashAccountsNew:transaction.selectedStatement")}</h3>
              </div>
              
              {statementId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={toggleStatementLock}
                  title={lockStatement 
                    ? t("CashAccountsNew:transaction.unlockStatement") 
                    : t("CashAccountsNew:transaction.lockStatement")
                  }
                >
                  {lockStatement 
                    ? <LockIcon size={14} /> 
                    : <UnlockIcon size={14} />
                  }
                </Button>
              )}
            </div>
            
            {isLoadingStatement ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : currentStatement ? (
              <>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {t("CashAccountsNew:statements.period")}:
                    </span>
                    <span className="text-xs font-medium">
                      {format(new Date(currentStatement.start_date), "d MMM yyyy", { locale: tr })} - {format(new Date(currentStatement.end_date), "d MMM yyyy", { locale: tr })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {t("CashAccountsNew:statements.status.title")}:
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {t(`CashAccountsNew:statements.status.${currentStatement.status.toLowerCase()}`)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {t("CashAccountsNew:statements.currentBalance")}:
                    </span>
                    <span className="text-xs font-semibold">
                      {formatCurrency(currentStatement.end_balance, currencyType)}
                    </span>
                  </div>
                </div>
                
                {/* Ekstre durumuna göre uyarı mesajı */}
                <StatementWarning 
                  statement={currentStatement}
                  statementError={null}
                  isLoadingStatement={false}
                />
              </>
            ) : (
              <div className="flex items-center justify-center py-2 text-muted-foreground text-sm">
                <InfoIcon size={14} className="mr-1" /> 
                {t("CashAccountsNew:transaction.noStatementSelected")}
              </div>
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            <AmountField control={form.control} currency={currencyType} />
            
            {/* Açıklama */}
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
