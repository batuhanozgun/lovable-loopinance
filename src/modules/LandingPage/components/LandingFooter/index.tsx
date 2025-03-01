
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEventsLogger } from "../../logging/events.logger";
import { useEffect } from "react";
import { useAnalyticsLogger } from "../../logging/analytics.logger";

export const LandingFooter = () => {
  const { t } = useTranslation("LandingPage");
  const { logFooterLinkClick } = useEventsLogger();
  const { logComponentView } = useAnalyticsLogger();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    logComponentView('LandingFooter');
  }, [logComponentView]);

  const handleFooterLinkClick = (section: string, linkName: string) => {
    logFooterLinkClick(section, linkName);
  };

  return (
    <footer className="bg-muted py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t("common:brandName")}</h3>
            <p className="text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.product.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="#features" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('product', 'features')}
                >
                  {t("footer.product.features")}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('product', 'pricing')}
                >
                  {t("footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('product', 'faq')}
                >
                  {t("footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.company.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('company', 'about')}
                >
                  {t("footer.company.about")}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('company', 'team')}
                >
                  {t("footer.company.team")}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('company', 'contact')}
                >
                  {t("footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.legal.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('legal', 'privacy')}
                >
                  {t("footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleFooterLinkClick('legal', 'terms')}
                >
                  {t("footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>
            © {currentYear} {t("common:brandName")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
