
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
  const { t } = useTranslation(["TransactionManagement", "StatementManagement", "common"]);

  // Hata durumu
  if (statementError) {
    return (
      <Alert variant="destructive" className="p-2 text-xs flex items-center gap-1.5">
        <AlertDescription className="pl-0">
          {statementError}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mb-3 p-2 border rounded-md bg-muted/30">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-muted-foreground" />
          <h3 className="text-xs font-medium">{t("TransactionManagement:transaction.selectedStatement")}</h3>
        </div>
        
        {statementId && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={toggleStatementLock}
            title={lockStatement 
              ? t("TransactionManagement:transaction.unlockStatement") 
              : t("TransactionManagement:transaction.lockStatement")
            }
          >
            {lockStatement 
              ? <LockIcon size={12} /> 
              : <UnlockIcon size={12} />
            }
          </Button>
        )}
      </div>
      
      {isLoadingStatement ? (
        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ) : currentStatement ? (
        <>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {t("StatementManagement:statements.period")}:
              </span>
              <span className="text-[10px] font-medium">
                {format(new Date(currentStatement.start_date), "d MMM yyyy", { locale: tr })} - {format(new Date(currentStatement.end_date), "d MMM yyyy", { locale: tr })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {t("StatementManagement:statements.status.title")}:
              </span>
              <Badge variant="outline" className="text-[10px] h-4 py-0 px-1.5">
                {t(`StatementManagement:statements.status.${currentStatement.status.toLowerCase()}`)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {t("StatementManagement:statements.currentBalance")}:
              </span>
              <span className="text-[10px] font-semibold">
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
        <div className="flex items-center justify-center py-1 text-muted-foreground text-[10px]">
          <InfoIcon size={12} className="mr-1" /> 
          {t("TransactionManagement:transaction.noStatementSelected")}
        </div>
      )}
    </div>
  );
};
