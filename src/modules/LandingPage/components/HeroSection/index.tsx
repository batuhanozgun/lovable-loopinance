
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";

export const HeroSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logComponentView } = useAnalyticsLogger();

  useEffect(() => {
    logComponentView('HeroSection');
  }, [logComponentView]);

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("hero.title")}</h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-xl">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="sm" asChild className="text-sm px-3 py-1 h-8">
              <Link to="/signup">
                {t("hero.cta.primary")} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-sm px-3 py-1 h-8">
              <Link to="#features">{t("hero.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted/80 backdrop-blur-sm rounded-lg aspect-video flex items-center justify-center shadow-md">
          <div className="text-muted-foreground p-6 text-center">
            <p className="text-base font-medium">{t("hero.image.alt")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
