
import { ReactNode } from "react";
import { SignUp } from "@/modules/UserManagement/Signup/views/SignupView";
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { DashboardView } from "@/modules/Dashboard";
import { ProfileView } from "@/modules/UserManagement/Profile";
import { SubscriptionView } from "@/modules/Subscription";
import { 
  SubscriptionDashboardView,
  SubscriptionPlansView,
  SubscriptionBillingView,
  SubscriptionSettingsView
} from "@/modules/Subscription/views/management";
import { CategoriesView } from "@/modules/Categories/views/CategoriesView";
import CategoryTemplatesView from "@/modules/CategoryTemplates/views/CategoryTemplatesView";
import Landing from "@/pages/Landing";
import PricingPage from "@/pages/Pricing";
import NotFound from "@/pages/NotFound";

// Rota türleri
export type RouteType = "private" | "public" | "conditional";

// Temel rota arayüzü
interface BaseRoute {
  path: string;
  element: ReactNode;
  type: RouteType;
}

// Özel rotalar için arayüz
interface PrivateRoute extends BaseRoute {
  type: "private";
}

// Genel rotalar için arayüz
interface PublicRoute extends BaseRoute {
  type: "public";
  redirectTo?: string;
}

// Koşullu rotalar için arayüz
interface ConditionalRoute extends BaseRoute {
  type: "conditional";
  privateElement: ReactNode;
  publicElement: ReactNode;
}

// Tüm rota türlerinin birleşimi
export type AppRoute = PrivateRoute | PublicRoute | ConditionalRoute;

/**
 * Uygulama rotaları
 */
export const routes: AppRoute[] = [
  // Koşullu rotalar
  {
    path: "/",
    type: "conditional",
    element: null, // Bu değer kullanılmaz
    privateElement: <DashboardView />,
    publicElement: <Landing />
  },
  
  // Genel rotalar
  {
    path: "/pricing",
    type: "public",
    element: <PricingPage />,
    redirectTo: undefined // Giriş yapılmış olsa bile erişilebilir
  },
  {
    path: "/signup",
    type: "public",
    element: <SignUp />,
    redirectTo: "/dashboard"
  },
  {
    path: "/login",
    type: "public",
    element: <Login />,
    redirectTo: "/dashboard"
  },
  
  // Özel rotalar (kimlik doğrulama gerektirir)
  {
    path: "/dashboard",
    type: "private",
    element: <DashboardView />
  },
  {
    path: "/profile",
    type: "private",
    element: <ProfileView />
  },
  {
    path: "/categories",
    type: "private",
    element: <CategoriesView />
  },
  {
    path: "/category-templates",
    type: "private",
    element: <CategoryTemplatesView />
  },
  {
    path: "/subscription",
    type: "private",
    element: <SubscriptionView />
  },
  {
    path: "/subscription/dashboard",
    type: "private",
    element: <SubscriptionDashboardView />
  },
  {
    path: "/subscription/plans",
    type: "private",
    element: <SubscriptionPlansView />
  },
  {
    path: "/subscription/billing",
    type: "private",
    element: <SubscriptionBillingView />
  },
  {
    path: "/subscription/settings",
    type: "private",
    element: <SubscriptionSettingsView />
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
