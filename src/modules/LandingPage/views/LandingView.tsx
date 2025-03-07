
import { HeroSection } from "@/modules/LandingPage/components/HeroSection";
import { FeatureSection } from "@/modules/LandingPage/components/FeatureSection";
import { PricingSection } from "@/modules/LandingPage/components/PricingSection";
import { CtaSection } from "@/modules/LandingPage/components/CtaSection";
import { LandingHeader } from "@/modules/LandingPage/components/LandingHeader";
import { LandingFooter } from "@/modules/LandingPage/components/LandingFooter";
import { usePageAnalytics } from "../hooks/usePageAnalytics";
import { useScrollTracking } from "../hooks/useScrollTracking";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../logging/analytics.logger";
import { initLandingPageTranslations } from "../i18n";

// Initialize translations
initLandingPageTranslations();

export const LandingView = () => {
  const { logComponentView } = useAnalyticsLogger();
  
  // Use our tracking hooks
  usePageAnalytics();
  useScrollTracking();

  // Log page view
  useEffect(() => {
    logComponentView('LandingView');
    console.log('[LandingPage] Page loaded');
  }, [logComponentView]);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeatureSection />
        <PricingSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
};
