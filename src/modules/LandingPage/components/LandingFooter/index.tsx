
import { useTranslation } from "react-i18next";
import { 
  Container, 
  Heading, 
  Text, 
  Link, 
  Divider,
  Grid,
  Section
} from "@/modules/LandingPage/styles";

export const LandingFooter = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <Section variant="footer" background="footer">
      <Container>
        <Grid cols={4} gap="md">
          <div>
            <Heading level="h4" className="mb-3">
              {t("common:brandName")}
            </Heading>
            <Text variant="muted" size="sm">
              {t("LandingPage:footer.tagline")}
            </Text>
          </div>
          
          <div>
            <Heading level="h5" className="mb-3">
              {t("LandingPage:footer.product.title")}
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/features" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.product.features")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level="h5" className="mb-3">
              {t("LandingPage:footer.company.title")}
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.company.about")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/team" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.company.team")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level="h5" className="mb-3">
              {t("LandingPage:footer.legal.title")}
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  variant="muted" 
                  size="sm" 
                >
                  {t("LandingPage:footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        
        <Divider className="mt-6 mb-4" />
        
        <Text variant="muted" size="sm" align="center">
          © {currentYear} {t("common:brandName")}. {t("LandingPage:footer.copyright")}
        </Text>
      </Container>
    </Section>
  );
};
