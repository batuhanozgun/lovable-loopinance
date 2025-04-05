
import { AppRoute } from "../types/routeTypes";
import { ROUTE_PATHS } from "../constants/routePaths";
import { conditionalRoutes } from "../routes/conditionalRoutes";
import { publicRoutes } from "../routes/publicRoutes";
import { dashboardRoutes } from "../routes/dashboardRoutes";
import { cashAccountsRoutes } from "../routes/cashAccountsRoutes";
import { subscriptionRoutes } from "../routes/subscriptionRoutes";

/**
 * Uygulama rotaları
 * 
 * Bu dosya tüm rota tanımlarını birleştirir ve dışa aktarır.
 * Büyük dosyayı daha küçük, yönetilebilir dosyalara bölmek için:
 * 1. Tipleri ve sabitleri ayrı dosyalara taşıdık
 * 2. Rota gruplarını farklı dosyalarda tanımladık
 * 3. Ana routeConfig.tsx dosyasında tüm rotaları birleştirdik
 */
export { ROUTE_PATHS } from "../constants/routePaths";
export { AppRoute } from "../types/routeTypes";
export type { PrivateRoute, PublicRoute, ConditionalRoute, RouteType, BaseRoute } from "../types/routeTypes";

/**
 * Tüm uygulama rotaları
 */
export const routes: AppRoute[] = [
  ...conditionalRoutes,
  ...publicRoutes,
  ...dashboardRoutes,
  ...cashAccountsRoutes,
  ...subscriptionRoutes
];
