
import { HeroSection } from "@/modules/LandingPage/components/HeroSection";
import { FeatureSection } from "@/modules/LandingPage/components/FeatureSection";
import { PricingSection } from "@/modules/LandingPage/components/PricingSection";
import { CtaSection } from "@/modules/LandingPage/components/CtaSection";
import { LandingHeader } from "@/modules/LandingPage/components/LandingHeader/index";
import { LandingFooter } from "@/modules/LandingPage/components/LandingFooter/index";
import { usePageAnalytics } from "../hooks/usePageAnalytics";
import { useScrollTracking } from "../hooks/useScrollTracking";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../logging/analytics.logger";
import { initLandingPageTranslations } from "../i18n";
import { useIsMobile } from "@/hooks/use-mobile";

// Initialize translations
initLandingPageTranslations();

export const LandingView = () => {
  const { logComponentView } = useAnalyticsLogger();
  const isMobile = useIsMobile();
  
  // Use our tracking hooks
  usePageAnalytics();
  useScrollTracking();

  // Log page view
  useEffect(() => {
    logComponentView('LandingView');
    console.log('[LandingPage] Page loaded');
  }, [logComponentView]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      <LandingHeader />
      <main className={`flex-1 ${isMobile ? 'pt-14' : 'pt-16'}`}>
        <HeroSection />
        <div className="relative">
          <FeatureSection />
          <PricingSection />
          <CtaSection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};
