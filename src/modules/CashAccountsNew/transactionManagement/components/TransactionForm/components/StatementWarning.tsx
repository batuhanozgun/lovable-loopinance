
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
  const { t } = useTranslation(["TransactionManagement"]);

  // Yükleme durumu
  if (isLoadingStatement) {
    return (
      <Alert className="mt-1 p-1.5">
        <Clock className="h-3 w-3 animate-spin" />
        <AlertDescription className="text-[10px] flex items-center">
          {t("TransactionManagement:transaction.warning.loadingStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Hata durumu
  if (statementError) {
    return (
      <Alert variant="destructive" className="mt-1 p-1.5">
        <AlertCircle className="h-3 w-3" />
        <AlertDescription className="text-[10px] flex items-center">
          {statementError}
        </AlertDescription>
      </Alert>
    );
  }

  // Ekstre bulunamadı
  if (!statement) {
    return (
      <Alert variant="destructive" className="mt-1 p-1.5">
        <AlertCircle className="h-3 w-3" />
        <AlertDescription className="text-[10px] flex items-center">
          {t("TransactionManagement:transaction.warning.noStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Ekstre durumuna göre uyarı göster
  if (statement.status === 'OPEN') {
    return (
      <Alert className="mt-1 p-1.5 border-green-500">
        <Calendar className="h-3 w-3 text-green-500" />
        <AlertDescription className="text-[10px] flex items-center">
          {t("TransactionManagement:transaction.warning.activeStatement")} 
          ({new Date(statement.start_date).toLocaleDateString()} - {new Date(statement.end_date).toLocaleDateString()})
        </AlertDescription>
      </Alert>
    );
  }

  // CLOSED durumu için uyarı
  if (statement.status === 'CLOSED') {
    return (
      <Alert variant="destructive" className="mt-1 p-1.5">
        <AlertCircle className="h-3 w-3" />
        <AlertDescription className="text-[10px] flex items-center">
          {t("TransactionManagement:transaction.warning.closedStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // FUTURE durumu için uyarı
  if (statement.status === 'FUTURE') {
    return (
      <Alert className="mt-1 p-1.5 border-amber-500">
        <AlertTriangle className="h-3 w-3 text-amber-500" />
        <AlertDescription className="text-[10px] flex items-center">
          {t("TransactionManagement:transaction.warning.futureStatement")}
        </AlertDescription>
      </Alert>
    );
  }

  // Bilinmeyen durumlar için varsayılan uyarı
  return (
    <Alert className="mt-1 p-1.5">
      <Clock className="h-3 w-3" />
      <AlertDescription className="text-[10px] flex items-center">
        {t("TransactionManagement:transaction.warning.unknownStatus", { status: statement.status })}
      </AlertDescription>
    </Alert>
  );
};
