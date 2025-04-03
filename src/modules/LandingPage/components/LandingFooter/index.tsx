
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-base mb-3">{t("common:brandName")}</h3>
            <p className="text-sm text-muted-foreground">{t("LandingPage:footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("LandingPage:footer.product.title")}</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.features")}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("LandingPage:footer.company.title")}</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.about")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.team")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("LandingPage:footer.legal.title")}</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-4 text-center text-xs text-muted-foreground">
          <p>
            © {currentYear} {t("common:brandName")}. {t("LandingPage:footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
