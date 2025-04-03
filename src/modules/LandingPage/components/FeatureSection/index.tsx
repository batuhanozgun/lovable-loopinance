
import { useTranslation } from "react-i18next";
import { ArrowDownRight, BarChart3, Lock, Rotate3D } from "lucide-react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";
import { useEffect } from "react";

export const FeatureSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logComponentView } = useAnalyticsLogger();

  useEffect(() => {
    logComponentView('FeatureSection');
  }, [logComponentView]);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: t("features.tracking.title"),
      description: t("features.tracking.description"),
    },
    {
      icon: <Rotate3D className="h-8 w-8 text-primary" />,
      title: t("features.sync.title"),
      description: t("features.sync.description"),
    },
    {
      icon: <ArrowDownRight className="h-8 w-8 text-primary" />,
      title: t("features.insights.title"),
      description: t("features.insights.description"),
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  return (
    <section id="features" className="py-12 px-4 bg-muted">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">{t("features.title")}</h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-4 rounded-lg shadow-sm">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
