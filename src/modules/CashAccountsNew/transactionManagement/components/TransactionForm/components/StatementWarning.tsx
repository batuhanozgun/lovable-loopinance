
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, Clock, Calendar } from "lucide-react";
import { AccountStatement } from "../../../../statementManagement/types";

interface StatementWarningProps {
  statement: AccountStatement | null;
  statementError: string | null;
  isLoadingStatement: boolean;
}

/**
 * Ekstre durumuna göre uyarı mesajı gösterir
 */
export const StatementWarning: React.FC<StatementWarningProps> = ({ 
  statement, 
  statementError, 
  isLoadingStatement 
}) => {
  const { t } = useTranslation(["CashAccountsNew", "errors"]);

  // Yükleme durumu
  if (isLoadingStatement) {
    return (
      <Alert className="mt-1">
        <Clock className="h-4 w-4 animate-spin" />
        <AlertDescription>
          {t("CashAccountsNew:transaction.warning.loadingStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Hata durumu
  if (statementError) {
    return (
      <Alert variant="destructive" className="mt-1">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {statementError}
        </AlertDescription>
      </Alert>
    );
  }

  // Ekstre bulunamadı
  if (!statement) {
    return (
      <Alert variant="destructive" className="mt-1">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t("CashAccountsNew:transaction.warning.noStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Ekstre durumuna göre uyarı göster
  if (statement.status === 'OPEN') {
    return (
      <Alert className="mt-1 border-green-500">
        <Calendar className="h-4 w-4 text-green-500" />
        <AlertDescription>
          {t("CashAccountsNew:transaction.warning.activeStatement")} 
          ({new Date(statement.start_date).toLocaleDateString()} - {new Date(statement.end_date).toLocaleDateString()})
        </AlertDescription>
      </Alert>
    );
  }

  // CLOSED durumu için uyarı
  if (statement.status === 'CLOSED') {
    return (
      <Alert variant="destructive" className="mt-1">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t("CashAccountsNew:transaction.warning.closedStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // FUTURE durumu için uyarı
  if (statement.status === 'FUTURE') {
    return (
      <Alert className="mt-1 border-amber-500">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertDescription>
          {t("CashAccountsNew:transaction.warning.futureStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Bilinmeyen durumlar için varsayılan uyarı
  return (
    <Alert className="mt-1">
      <Clock className="h-4 w-4" />
      <AlertDescription>
        {t("CashAccountsNew:transaction.warning.unknownStatus", { status: statement.status })}
      </AlertDescription>
    </Alert>
  );
};
