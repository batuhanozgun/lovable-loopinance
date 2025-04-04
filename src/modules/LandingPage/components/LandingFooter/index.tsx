
import { useTranslation } from "react-i18next";
import { 
  Container, 
  Heading, 
  Text, 
  Link, 
  Divider,
  Grid
} from "@/modules/LandingPage/styles";

export const LandingFooter = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/80 py-6 px-4">
      <Container>
        <Grid cols={4} gap="md">
          <div>
            <Heading level="h3" className="font-bold text-sm mb-2">
              {t("common:brandName")}
            </Heading>
            <Text variant="muted" size="xs">
              {t("LandingPage:footer.tagline")}
            </Text>
          </div>
          
          <div>
            <Heading level="h4" className="font-semibold text-xs mb-2">
              {t("LandingPage:footer.product.title")}
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/features" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.product.features")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level="h4" className="font-semibold text-xs mb-2">
              {t("LandingPage:footer.company.title")}
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/about" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.company.about")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/team" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.company.team")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level="h4" className="font-semibold text-xs mb-2">
              {t("LandingPage:footer.legal.title")}
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/privacy-policy" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  variant="muted" 
                  size="xs" 
                  className="text-[10px]"
                >
                  {t("LandingPage:footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        
        <Divider className="mt-4 mb-3" />
        
        <Text variant="muted" size="xs" align="center" className="text-[10px]">
          © {currentYear} {t("common:brandName")}. {t("LandingPage:footer.copyright")}
        </Text>
      </Container>
    </footer>
  );
};
