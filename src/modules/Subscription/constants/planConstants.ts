
import { SubscriptionPlan } from "../interfaces/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const logger = LoggerService.getInstance("planConstants");

export const SUBSCRIPTION_PLAN_TYPES = {
  TRIAL: 'trial',
  PREMIUM: 'premium'
};

export const SUBSCRIPTION_PLAN_INTERVALS = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

export const DEFAULT_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
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
  }
];

export const getDefaultSubscriptionPlans = (): SubscriptionPlan[] => {
  try {
    return DEFAULT_SUBSCRIPTION_PLANS;
  } catch (error) {
    logger.error("Abonelik planları getirilemedi", error);
    return [];
  }
};
