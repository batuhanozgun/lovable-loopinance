
import { PrivateRoute } from "../types/routeTypes";
import { SubscriptionView } from "@/modules/Subscription";
import { 
  SubscriptionDashboardView,
  SubscriptionPlansView,
  SubscriptionBillingView,
  SubscriptionSettingsView
} from "@/modules/Subscription/views/management";

/**
 * Abonelik modülü rotaları
 */
export const subscriptionRoutes: PrivateRoute[] = [
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
  }
];
