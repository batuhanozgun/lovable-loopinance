
import { useTranslation } from "react-i18next";
import { ArrowDownRight, BarChart3, Lock, Rotate3D } from "lucide-react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";
import { useEffect } from "react";
import { 
  Section,
  Container,
  Heading,
  Text,
  Grid,
  FeatureCard,
  IconWrapper
} from "@/modules/LandingPage/styles";

export const FeatureSection = () => {
  const { t } = useTranslation("LandingPage");
  const { logComponentView } = useAnalyticsLogger();

  useEffect(() => {
    logComponentView('FeatureSection');
  }, [logComponentView]);

  const features = [
    {
      icon: <BarChart3 />,
      title: t("features.tracking.title"),
      description: t("features.tracking.description"),
    },
    {
      icon: <Rotate3D />,
      title: t("features.sync.title"),
      description: t("features.sync.description"),
    },
    {
      icon: <ArrowDownRight />,
      title: t("features.insights.title"),
      description: t("features.insights.description"),
    },
    {
      icon: <Lock />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  return (
    <Section variant="feature" background="muted" id="features">
      <Container>
        <div className="text-center mb-8">
          <Heading level="h2" align="center" className="mb-2">
            {t("features.title")}
          </Heading>
          
          <Text variant="muted" size="sm" align="center" className="max-w-xl mx-auto">
            {t("features.subtitle")}
          </Text>
        </div>

        <Grid cols={4} gap="md">
          {features.map((feature, index) => (
            <FeatureCard key={index} hover="both" rounded="lg">
              <div className="flex flex-col h-full">
                <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
                  {feature.icon}
                </IconWrapper>
                
                <Heading level="h3" className="text-sm font-semibold mb-1.5">
                  {feature.title}
                </Heading>
                
                <Text variant="muted" size="xs">
                  {feature.description}
                </Text>
              </div>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
