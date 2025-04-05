
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { routes } from "../config/routeConfig";
import { AppRoute } from "../types/routeTypes";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

interface AppRoutesProps {
  isAuthenticated: boolean | null;
  isLoading: boolean;
}

/**
 * Tüm uygulama rotalarını render eden ana bileşen
 */
export const AppRoutes = ({ isAuthenticated, isLoading }: AppRoutesProps) => {
  const logger = LoggerService.getInstance("AppRoutes");
  
  // Yükleme durumunda rotaları render etme
  if (isLoading || isAuthenticated === null) {
    return null;
  }
  
  logger.debug("Rendering routes with auth state:", { isAuthenticated });
  
  return (
    <Routes>
      {routes.map((route: AppRoute, index) => {
        // Rota türüne göre uygun bileşeni döndür
        switch (route.type) {
          case "private":
            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    {route.element}
                  </PrivateRoute>
                }
              />
            );
            
          case "public":
            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={
                  <PublicRoute 
                    isAuthenticated={isAuthenticated}
                    redirectTo={route.redirectTo}
                  >
                    {route.element}
                  </PublicRoute>
                }
              />
            );
            
          case "conditional":
            return (
              <Route
                key={`route-${index}`}
                path={route.path}
                element={
                  isAuthenticated ? (
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      {route.privateElement}
                    </PrivateRoute>
                  ) : (
                    route.publicElement
                  )
                }
              />
            );
            
          default:
            logger.error("Unknown route type:", route);
            return null;
        }
      })}
    </Routes>
  );
};
