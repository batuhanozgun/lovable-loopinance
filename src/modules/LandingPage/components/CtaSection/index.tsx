
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEventsLogger } from "../../logging/events.logger";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";

export const CtaSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logCtaClick } = useEventsLogger();
  const { logComponentView } = useAnalyticsLogger();

  useEffect(() => {
    logComponentView('CtaSection');
  }, [logComponentView]);

  const handleCtaClick = () => {
    logCtaClick('signup');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t("cta.description")}
        </p>
        <Button size="lg" asChild onClick={handleCtaClick}>
          <Link to="/signup">
            {t("cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
