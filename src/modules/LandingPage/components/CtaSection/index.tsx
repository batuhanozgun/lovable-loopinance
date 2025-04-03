
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEventsLogger } from "../../logging/events.logger";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";
import { Card } from "@/components/ui/card";

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
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-blue-50/50 to-cyan-50/80 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80 backdrop-blur-[2px]"></div>
      
      {/* Content container */}
      <div className="max-w-5xl mx-auto relative z-10">
        <Card className="px-6 py-8 md:p-8 border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center mb-4 gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{t("cta.badge")}</span>
            </div>
            
            <h2 className="text-xl font-bold mb-3 text-foreground">{t("cta.title")}</h2>
            
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            
            <Button size="sm" className="group shadow-sm px-4 py-2" onClick={handleCtaClick} asChild>
              <Link to="/signup">
                {t("cta.button")} 
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
