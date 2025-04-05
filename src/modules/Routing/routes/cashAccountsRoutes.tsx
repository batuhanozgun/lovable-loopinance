
import { PrivateRoute } from "../types/routeTypes";
import { 
  CashAccountsNewView, 
  CreateCashAccountView,
  StatementsListView,
  StatementDetailView
} from "@/modules/CashAccountsNew";

/**
 * Nakit hesaplar modülü rotaları
 */
export const cashAccountsRoutes: PrivateRoute[] = [
  // Nakit Hesaplar rotaları
  {
    path: "/nakit-hesaplar",
    type: "private",
    element: <CashAccountsNewView />
  },
  {
    path: "/nakit-hesaplar/new",
    type: "private",
    element: <CreateCashAccountView />
  },
  {
    path: "/nakit-hesaplar/:accountId/statements",
    type: "private",
    element: <StatementsListView />
  },
  {
    path: "/nakit-hesaplar/:accountId/statements/:statementId",
    type: "private",
    element: <StatementDetailView />
  },
  // Eski nakit hesaplar için yönlendirmeler
  {
    path: "/cash-accounts",
    type: "private",
    element: <CashAccountsNewView />
  },
  {
    path: "/cash-accounts/new",
    type: "private",
    element: <CreateCashAccountView />
  },
  {
    path: "/cash-accounts/:id",
    type: "private",
    element: <CashAccountsNewView />
  },
  {
    path: "/cash-accounts/:accountId/statements",
    type: "private",
    element: <StatementsListView />
  },
  {
    path: "/cash-accounts/:accountId/statements/:statementId",
    type: "private",
    element: <StatementDetailView />
  },
  {
    path: "/cash-accounts-new",
    type: "private",
    element: <CashAccountsNewView />
  }
];
