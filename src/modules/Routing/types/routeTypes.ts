
import { ReactNode } from "react";

// Rota türleri
export type RouteType = "private" | "public" | "conditional";

// Temel rota arayüzü
export interface BaseRoute {
  path: string;
  element: ReactNode;
  type: RouteType;
}

// Özel rotalar için arayüz
export interface PrivateRoute extends BaseRoute {
  type: "private";
}

// Genel rotalar için arayüz
export interface PublicRoute extends BaseRoute {
  type: "public";
  redirectTo?: string;
}

// Koşullu rotalar için arayüz
export interface ConditionalRoute extends BaseRoute {
  type: "conditional";
  privateElement: ReactNode;
  publicElement: ReactNode;
}

// Tüm rota türlerinin birleşimi
export type AppRoute = PrivateRoute | PublicRoute | ConditionalRoute;
