
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { Home, Wallet, Grid, List, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { bottomNavLogger } from "../../logging";
import { Button } from "@/components/ui/button";
import { useCashAccounts } from "@/modules/CashAccountsNew/cashAccountHomepage/hooks";
import { CashAccount, CurrencyType } from "@/modules/CashAccountsNew/cashAccountHomepage/types";
import { useToast } from "@/hooks/use-toast";
import { TransactionForm } from "@/modules/CashAccountsNew/transactionManagement";
import { StatementFinderService } from "@/modules/CashAccountsNew/transactionManagement/services/StatementFinderService";
import { useQueryClient } from "@tanstack/react-query";

export const BottomNav: React.FC = () => {
  const { t } = useTranslation(["AppLayout", "common"]);
  const location = useLocation();
  const { data: accounts } = useCashAccounts();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CashAccount | null>(null);
  const [activeStatementId, setActiveStatementId] = useState<string | undefined>(undefined);

  bottomNavLogger.debug("BottomNav rendered", { currentPath: location.pathname });

  const navItems = [
    {
      label: t("AppLayout:navigation.dashboard"),
      path: "/dashboard",
      icon: Home,
    },
    {
      label: t("AppLayout:navigation.accounts"),
      path: "/accounts",
      icon: Wallet,
    },
    { label: "", path: "", icon: null }, 
    {
      label: t("AppLayout:navigation.budgets"),
      path: "/budgets",
      icon: Grid,
    },
    {
      label: t("AppLayout:navigation.categories"),
      path: "/categories",
      icon: List,
    },
  ];

  const handleNewTransactionClick = async () => {
    bottomNavLogger.debug("New transaction FAB clicked");

    if (!accounts || accounts.length === 0) {
      toast({
        variant: "destructive",
        title: t("CashAccountsNew:errors.account.notFound"),
      });
      return;
    }

    const account = accounts[0];
    setSelectedAccount(account);

    try {
      const statements = await StatementFinderService.findOpenStatements(account.id);

      if (statements && statements.length > 0) {
        setActiveStatementId(statements[0].id);
        setIsTransactionFormOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: t("CashAccountsNew:errors.statement.notFound"),
          description: t("CashAccountsNew:errors.statement.createFirst"),
        });
      }
    } catch (error) {
      bottomNavLogger.error("Failed to open transaction form", error);
      toast({
        variant: "destructive",
        title: t("common:error"),
        description: t("CashAccountsNew:errors.statement.loadFailed"),
      });
    }
  };

  const handleCloseTransactionForm = async () => {
    setIsTransactionFormOpen(false);
    setSelectedAccount(null);

    if (activeStatementId) {
      await queryClient.refetchQueries({ queryKey: ["cashAccountStatementNew", activeStatementId], exact: true });
      await queryClient.refetchQueries({ queryKey: ["statementTransactions", activeStatementId], exact: true });
    }

    if (selectedAccount) {
      await queryClient.refetchQueries({ queryKey: ["accountStatements", selectedAccount.id], exact: true });
    }

    await queryClient.refetchQueries({ queryKey: ["cashAccountsNew"] });
    setActiveStatementId(undefined);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border flex items-center justify-around z-30">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
        
        // Orta konumda FAB butonunu yerleştir
        if (index === 2) {
          return (
            <div key="fab-container" className="relative -mt-5">
              <Button
                onClick={handleNewTransactionClick}
                size="icon"
                variant="gradient"
                className={cn(
                  "h-12 w-12 rounded-full",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300 ease-in-out",
                  "scale-100 hover:scale-105",
                  "group"
                )}
                aria-label={t("AppLayout:navigation.newTransaction")}
              >
                <PlusCircle 
                  size={22} 
                  className={cn(
                    "text-slate-900 dark:text-primary-foreground", 
                    "transition-transform duration-300 group-hover:rotate-90"
                  )} 
                />
              </Button>
            </div>
          );
        }

        // Normal navigasyon öğeleri
        if (item.icon) {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center w-16 py-1"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <IconComponent size={20} className="mb-0.5" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        }

        return null;
      })}
      </nav>

      {selectedAccount && (
        <TransactionForm
          isOpen={isTransactionFormOpen}
          onClose={handleCloseTransactionForm}
          accountId={selectedAccount.id}
          statementId={activeStatementId}
          currency={selectedAccount.currency as CurrencyType}
        />
      )}
    </>
  );
};
