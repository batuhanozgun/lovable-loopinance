import { useTranslation } from "react-i18next";
import { ArrowDownRight, BarChart3, Lock, Rotate3D } from "lucide-react";
export const FeatureSection = () => {
  const {
    t
  } = useTranslation("landing");
  const features = [{
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: t("features.tracking.title"),
    description: t("features.tracking.description")
  }, {
    icon: <Rotate3D className="h-10 w-10 text-primary" />,
    title: t("features.sync.title"),
    description: t("features.sync.description")
  }, {
    icon: <ArrowDownRight className="h-10 w-10 text-primary" />,
    title: t("features.insights.title"),
    description: t("features.insights.description")
  }, {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: t("features.security.title"),
    description: t("features.security.description")
  }];
  return <section id="features" className="py-20 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[rgba(84,85,89,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(185,100%,15%,1)] ">{t("features.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};