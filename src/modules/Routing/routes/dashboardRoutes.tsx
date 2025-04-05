
import { PrivateRoute } from "../types/routeTypes";
import { DashboardView } from "@/modules/Dashboard";
import { ProfileView } from "@/modules/UserManagement/Profile";
import { CategoriesView } from "@/modules/Categories/views/CategoriesView";
import CategoryTemplatesView from "@/modules/CategoryTemplates/views/CategoryTemplatesView";
import { StyleGuideView } from "@/modules/StyleGuide";
import CategoriesStyleGuideView from "@/modules/Categories/views/StyleGuide";

/**
 * Kullanıcı paneline ait rotalar
 */
export const dashboardRoutes: PrivateRoute[] = [
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
  // Stil Kılavuzu rotaları
  {
    path: "/style-guides",
    type: "private",
    element: <StyleGuideView />
  },
  {
    path: "/style-guides/categories",
    type: "private",
    element: <CategoriesStyleGuideView />
  }
];
