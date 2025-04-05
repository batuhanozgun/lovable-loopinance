
import { PublicRoute } from "../types/routeTypes";
import { SignUp } from "@/modules/UserManagement/Signup/views/SignupView";
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import PricingPage from "@/pages/Pricing";
import StyleGuide from "@/pages/StyleGuide";
import CategoriesStyleGuide from "@/pages/CategoriesStyleGuide";

// Landing page rotaları
import Features from "@/pages/Features";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

/**
 * Genel erişilebilir rotalar - kimlik doğrulama gerektirmez
 */
export const publicRoutes: PublicRoute[] = [
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
  }
];
