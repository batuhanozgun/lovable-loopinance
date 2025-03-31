
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";

interface StatementWarningProps {
  status: string;
}

/**
 * Ekstre durumuna göre uyarı mesajı gösterir
 */
export const StatementWarning: React.FC<StatementWarningProps> = ({ status }) => {
  const { t } = useTranslation(["CashAccountsNew", "errors"]);

  if (status === 'OPEN') {
    return null;
  }

  // CLOSED durumu için uyarı
  if (status === 'CLOSED') {
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
  if (status === 'FUTURE') {
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
        {t("CashAccountsNew:transaction.warning.unknownStatus", { status })}
      </AlertDescription>
    </Alert>
  );
};
