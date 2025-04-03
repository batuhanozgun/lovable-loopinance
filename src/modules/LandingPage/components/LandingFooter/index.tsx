
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/80 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold text-sm mb-2">{t("common:brandName")}</h3>
            <p className="text-xs text-muted-foreground">{t("LandingPage:footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-xs mb-2">{t("LandingPage:footer.product.title")}</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/features" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.features")}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs mb-2">{t("LandingPage:footer.company.title")}</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.about")}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.team")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs mb-2">{t("LandingPage:footer.legal.title")}</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy-policy" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-4 pt-3 text-center text-[10px] text-muted-foreground">
          <p>
            © {currentYear} {t("common:brandName")}. {t("LandingPage:footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
