
import { SubscriptionPlan } from "../interfaces/subscription/ISubscription";

/**
 * Abonelik planları
 */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "trial-plan",
    type: "trial",
    name: "Deneme",
    price: 0,
    interval: "monthly",
    features: ["basic-tracking", "limited-accounts", "basic-reports"],
    description: "3 aylık sınırlı deneme sürümü"
  },
  {
    id: "premium-monthly",
    type: "premium",
    name: "Premium",
    price: 9.99,
    interval: "monthly",
    features: ["unlimited-accounts", "advanced-reports", "budgeting", "api-access"],
    description: "Tam özellikli premium paket"
  },
  {
    id: "premium-yearly",
    type: "premium",
    name: "Premium Yıllık",
    price: 99.99,
    interval: "yearly",
    features: ["unlimited-accounts", "advanced-reports", "budgeting", "api-access"],
    description: "Tam özellikli premium paket (yıllık fatura %16 tasarruf)"
  },
  {
    id: "business-monthly",
    type: "business",
    name: "Kurumsal",
    price: 29.99,
    interval: "monthly",
    features: ["unlimited-accounts", "advanced-reports", "budgeting", "api-access", "team-access", "dedicated-support"],
    description: "Şirketler için kurumsal çözüm"
  }
];

/**
 * Plan tipleri
 */
export const PLAN_TYPES = {
  TRIAL: "trial",
  PREMIUM: "premium",
  BUSINESS: "business"
};

/**
 * Plan dönemleri
 */
export const PLAN_INTERVALS = {
  MONTHLY: "monthly",
  YEARLY: "yearly"
};
