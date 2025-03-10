
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/modules/AppLayout/components/Layout";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

/**
 * Kimlik doğrulama gerektiren rotalar için wrapper bileşeni.
 * Kullanıcı kimliği doğrulanmamışsa login sayfasına yönlendirir.
 */
export const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};
