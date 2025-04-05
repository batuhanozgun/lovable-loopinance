
import { ReactNode } from "react";
import { ConditionalRoute } from "../types/routeTypes";
import { DashboardView } from "@/modules/Dashboard";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

/**
 * Koşullu rotalar - kullanıcının giriş durumuna göre farklı içerik gösterilir
 */
export const conditionalRoutes: ConditionalRoute[] = [
  {
    path: "/",
    type: "conditional",
    element: null, // Bu değer kullanılmaz
    privateElement: <DashboardView />,
    publicElement: <Landing />
  },
  // 404 sayfası
  {
    path: "*",
    type: "conditional",
    element: null, // Bu değer kullanılmaz
    privateElement: <NotFound />,
    publicElement: <NotFound />
  }
];
