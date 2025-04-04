
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEventsLogger } from "../../logging/events.logger";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";
import { Card } from "@/components/ui/card";
import { IconButton } from "../common/IconButton";
import {
  Section,
  Container,
  Heading,
  Text,
  IconWrapper,
  Badge
} from "@/modules/LandingPage/styles";

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
    <Section variant="cta" background="gradient">
      <Container size="narrow">
        <Card variant="glass" className="px-5 py-6 md:p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Badge variant="pill" size="sm" className="mb-3">
              <IconWrapper variant="primary" size="xs" className="mr-1">
                <Sparkles />
              </IconWrapper>
              <span>{t("cta.badge")}</span>
            </Badge>
            
            <Heading level="h2" className="text-base font-bold mb-2">
              {t("cta.title")}
            </Heading>
            
            <Text variant="muted" size="xs" className="mb-4 max-w-xl mx-auto">
              {t("cta.description")}
            </Text>
            
            <IconButton 
              onClick={handleCtaClick}
              asChild
            >
              <Link to="/signup">
                {t("cta.button")}
                <ArrowRight />
              </Link>
            </IconButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
};
