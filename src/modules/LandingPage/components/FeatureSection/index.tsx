
import { useTranslation } from "react-i18next";
import { ArrowDownRight, BarChart3, Lock, Rotate3D } from "lucide-react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

export const FeatureSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logComponentView } = useAnalyticsLogger();

  useEffect(() => {
    logComponentView('FeatureSection');
  }, [logComponentView]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: t("features.tracking.title"),
      description: t("features.tracking.description"),
    },
    {
      icon: <Rotate3D className="h-6 w-6 text-primary" />,
      title: t("features.sync.title"),
      description: t("features.sync.description"),
    },
    {
      icon: <ArrowDownRight className="h-6 w-6 text-primary" />,
      title: t("features.insights.title"),
      description: t("features.insights.description"),
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  return (
    <section id="features" className="py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30 -z-10"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold mb-3">{t("features.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-5 border border-border/40 bg-background/90 hover:shadow-md transition-all hover:border-border/60 hover:-translate-y-0.5 duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-10 h-10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
