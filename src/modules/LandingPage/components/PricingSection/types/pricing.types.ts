
// Desteklenen plan tipleri
export type PricingPlanType = "trial" | "monthly" | "yearly";

// Fiyatlandırma analitik olayları için tip
export interface PricingAnalyticsEvent {
  planType?: PricingPlanType;
  action: 'view' | 'click' | 'scroll';
  source: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown; // Index signature ekliyoruz
}
