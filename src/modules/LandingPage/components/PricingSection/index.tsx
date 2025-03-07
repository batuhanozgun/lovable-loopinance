
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PricingCard } from "./components/PricingCard";
import { usePricingAnalytics } from "./hooks/usePricingAnalytics";
import { PRICING_PLANS } from "./constants/pricing.constants";
import { pricingLogger } from "../../logging/pricing.logger";

export const PricingSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logSectionView } = usePricingAnalytics();

  useEffect(() => {
    logSectionView();
    pricingLogger.debug("PricingSection rendered");
  }, [logSectionView]);

  return (
    <section id="pricing" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((planKey) => (
            <PricingCard key={planKey} planType={planKey} />
          ))}
        </div>
      </div>
    </section>
  );
};
