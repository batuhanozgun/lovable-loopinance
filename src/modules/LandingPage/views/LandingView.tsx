
import { HeroSection } from "@/modules/LandingPage/components/HeroSection";
import { FeatureSection } from "@/modules/LandingPage/components/FeatureSection";
import { CtaSection } from "@/modules/LandingPage/components/CtaSection";
import { LandingHeader } from "@/modules/LandingPage/components/LandingHeader";
import { LandingFooter } from "@/modules/LandingPage/components/LandingFooter";

export const LandingView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
};
