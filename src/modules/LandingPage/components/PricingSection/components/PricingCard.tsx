
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlanFeatureList } from "./PlanFeatureList";
import { PlanBadge } from "./PlanBadge";
import { usePricingAnalytics } from "../hooks/usePricingAnalytics";
import { PricingPlanType } from "../types/pricing.types";

interface PricingCardProps {
  planType: PricingPlanType;
}

export const PricingCard = ({ planType }: PricingCardProps) => {
  const { t } = useTranslation("LandingPage");
  const { logPlanView, logCtaClick } = usePricingAnalytics();

  // Card'ın durumuna göre stil ayarları
  const isPopular = planType === "trial";
  const isYearly = planType === "yearly";

  // Analytics için loglama
  React.useEffect(() => {
    logPlanView(planType);
  }, [planType, logPlanView]);

  const handleCtaClick = () => {
    logCtaClick(planType);
  };

  return (
    <Card 
      className={`relative flex flex-col h-full transition-transform duration-200 hover:shadow-lg ${
        isPopular ? "border-primary shadow-md" : ""
      }`}
    >
      {/* Öne çıkan plan için badge */}
      {(isPopular || isYearly) && (
        <PlanBadge planType={planType} />
      )}

      <CardHeader className="text-center pt-8">
        <h3 className="text-xl font-bold mb-2">{t(`pricing.plans.${planType}.name`)}</h3>
        <div className="mt-4">
          <span className="text-3xl font-bold">{t(`pricing.plans.${planType}.price`)}</span>
          {planType !== "trial" && (
            <span className="text-muted-foreground">/{t(`pricing.plans.${planType}.period`)}</span>
          )}
        </div>
        {planType === "trial" && (
          <p className="text-sm text-muted-foreground mt-2">{t(`pricing.plans.${planType}.duration`)}</p>
        )}
      </CardHeader>

      <CardContent className="flex-grow">
        <PlanFeatureList planType={planType} />
      </CardContent>

      <CardFooter className="pt-4 pb-8">
        <Button
          className="w-full"
          variant={isPopular ? "default" : isYearly ? "gradient" : "outline"}
          asChild
        >
          <Link to={planType === "trial" ? "/signup" : "/pricing"} onClick={handleCtaClick}>
            {planType === "trial" 
              ? t("pricing.cta.trial") 
              : t("pricing.cta.subscribe")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
