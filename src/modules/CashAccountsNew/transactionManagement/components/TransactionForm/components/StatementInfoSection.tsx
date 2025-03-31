
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, InfoIcon, LockIcon, UnlockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { StatementWarning } from "./StatementWarning";
import { formatCurrency } from "../../../../cashAccountHomepage/utils/currencyUtils";
import { CurrencyType } from "../../../../cashAccountHomepage/types";
import { AccountStatement } from "../../../../statementManagement/types";

interface StatementInfoSectionProps {
  currencyType: CurrencyType;
  statementId?: string;
  currentStatement: AccountStatement | null;
  isLoadingStatement: boolean;
  statementError: string | null;
  lockStatement: boolean;
  toggleStatementLock: () => void;
}

/**
 * Ekstre bilgi bölümü
 */
export const StatementInfoSection: React.FC<StatementInfoSectionProps> = ({
  currencyType,
  statementId,
  currentStatement,
  isLoadingStatement,
  statementError,
  lockStatement,
  toggleStatementLock
}) => {
  const { t } = useTranslation(["CashAccountsNew", "common", "errors"]);

  // Hata durumu
  if (statementError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {statementError}
        </AlertDescription>
      </Alert>
    );
  }

  return (
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
  );
};
