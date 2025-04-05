
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
import { 
  CashAccountsNewView, 
  CreateCashAccountView,
  StatementsListView,
  StatementDetailView
} from "@/modules/CashAccountsNew";
import { StyleGuideView } from "@/modules/StyleGuide";
import Landing from "@/pages/Landing";
import PricingPage from "@/pages/Pricing";
import NotFound from "@/pages/NotFound";
import StyleGuide from "@/pages/StyleGuide";
import CategoriesStyleGuide from "@/pages/CategoriesStyleGuide";

// Landing page routes
import Features from "@/pages/Features";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

// Rota türleri
export type RouteType = "private" | "public" | "conditional";

// Route tanımlarını içeren sabit bir nesne
export const ROUTE_PATHS = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  ADMIN: '/admin',
  SUBSCRIPTION: '/subscription',
  PAYMENT: '/payment',
  CATEGORIES: '/categories',
  CATEGORY_TEMPLATES: '/category-templates',
  CASH_ACCOUNTS_NEW: '/cash-accounts-new',
  STYLE_GUIDE: '/style-guide',
  CATEGORIES_STYLE_GUIDE: '/categories-style-guide',
};

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
  
  // Landing page rotaları
  {
    path: "/features",
    type: "public",
    element: <Features />,
    redirectTo: undefined
  },
  {
    path: "/about",
    type: "public",
    element: <About />,
    redirectTo: undefined
  },
  {
    path: "/style-guide", 
    type: "public",
    element: <StyleGuide />,
    redirectTo: undefined
  },
  {
    path: "/categories-style-guide", // Kategoriler stil kılavuzu rotası
    type: "public",
    element: <CategoriesStyleGuide />,
    redirectTo: undefined
  },
  {
    path: "/faq",
    type: "public",
    element: <FAQ />,
    redirectTo: undefined
  },
  {
    path: "/team",
    type: "public",
    element: <Team />,
    redirectTo: undefined
  },
  {
    path: "/contact",
    type: "public",
    element: <Contact />,
    redirectTo: undefined
  },
  {
    path: "/privacy-policy",
    type: "public",
    element: <PrivacyPolicy />,
    redirectTo: undefined
  },
  {
    path: "/terms-of-service",
    type: "public",
    element: <TermsOfService />,
    redirectTo: undefined
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
  },
  
  // Stil Kılavuzu rotaları
  {
    path: "/style-guides",
    type: "private",
    element: <StyleGuideView />
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
