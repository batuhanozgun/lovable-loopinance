
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Kimlik doğrulama gerektirmeyen rotalar için wrapper bileşeni.
 * Kullanıcı zaten giriş yapmışsa belirlenen sayfaya yönlendirir.
 */
export const PublicRoute = ({ 
  isAuthenticated, 
  children, 
  redirectTo = "/dashboard" 
}: PublicRouteProps) => {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};
