
import React, { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ReactNode } from "react";

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

// Lazy load ile import edilen componentler
const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Profile = lazy(() => import('@/pages/Profile'));
const Admin = lazy(() => import('@/pages/Admin'));
const Subscription = lazy(() => import('@/pages/Subscription'));
const Payment = lazy(() => import('@/pages/Payment'));
const CategoriesView = lazy(() => import('@/modules/Categories/views/CategoriesView'));
const CategoryTemplatesView = lazy(() => import('@/modules/Categories/views/CategoryTemplatesView'));
const CashAccountsNewView = lazy(() => import('@/modules/CashAccountsNew/views/CashAccountsNewView'));
const StyleGuide = lazy(() => import('@/pages/StyleGuide'));

// Yeni StyleGuide importu
const CategoriesStyleGuide = lazy(() => import('@/pages/CategoriesStyleGuide'));

/**
 * Uygulama rotaları
 */
export const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    element: <Home />,
  },
  {
    path: '/',
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    element: <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>,
  },
  {
    path: ROUTE_PATHS.PROFILE,
    element: <Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>,
  },
  {
    path: ROUTE_PATHS.ADMIN,
    element: <Suspense fallback={<div>Loading...</div>}><Admin /></Suspense>,
  },
  {
    path: ROUTE_PATHS.SUBSCRIPTION,
    element: <Suspense fallback={<div>Loading...</div>}><Subscription /></Suspense>,
  },
  {
    path: ROUTE_PATHS.PAYMENT,
    element: <Suspense fallback={<div>Loading...</div>}><Payment /></Suspense>,
  },
  {
    path: ROUTE_PATHS.CATEGORIES,
    element: <Suspense fallback={<div>Loading...</div>}><CategoriesView /></Suspense>,
  },
  {
    path: ROUTE_PATHS.CATEGORY_TEMPLATES,
    element: <Suspense fallback={<div>Loading...</div>}><CategoryTemplatesView /></Suspense>,
  },
  {
    path: ROUTE_PATHS.CASH_ACCOUNTS_NEW,
    element: <Suspense fallback={<div>Loading...</div>}><CashAccountsNewView /></Suspense>,
  },

  // StyleGuide rotaları 
  {
    path: '/style-guide',
    element: <Suspense fallback={<div>Loading...</div>}><StyleGuide /></Suspense>,
  },
  {
    path: '/categories-style-guide',
    element: <Suspense fallback={<div>Loading...</div>}><CategoriesStyleGuide /></Suspense>,
  },
  
  // 404 sayfası için redirect
  {
    path: '*',
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
];
