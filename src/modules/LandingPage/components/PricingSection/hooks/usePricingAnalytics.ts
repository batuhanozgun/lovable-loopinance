
import { useCallback } from 'react';
import { pricingEventsLogger, pricingAnalyticsLogger } from '../../../logging/pricing.logger';
import { PricingPlanType, PricingAnalyticsEvent } from '../types/pricing.types';

export const usePricingAnalytics = () => {
  // Genel analitik olaylarını logla
  const logPricingEvent = useCallback((event: PricingAnalyticsEvent) => {
    pricingAnalyticsLogger.info('Pricing event recorded', event);
  }, []);

  // Plan görüntüleme olaylarını logla
  const logPlanView = useCallback((planType: PricingPlanType) => {
    pricingEventsLogger.debug(`User viewed ${planType} plan`);
    logPricingEvent({
      planType,
      action: 'view',
      source: 'pricing_card'
    });
  }, [logPricingEvent]);

  // CTA tıklama olaylarını logla
  const logCtaClick = useCallback((planType: PricingPlanType) => {
    pricingEventsLogger.info(`User clicked CTA for ${planType} plan`);
    logPricingEvent({
      planType,
      action: 'click',
      source: 'pricing_cta'
    });
  }, [logPricingEvent]);

  // Bölüm görüntüleme olayını logla
  const logSectionView = useCallback(() => {
    pricingEventsLogger.debug('User viewed pricing section');
    logPricingEvent({
      action: 'view',
      source: 'pricing_section'
    });
  }, [logPricingEvent]);

  return {
    logPlanView,
    logCtaClick,
    logSectionView,
    logPricingEvent
  };
};
