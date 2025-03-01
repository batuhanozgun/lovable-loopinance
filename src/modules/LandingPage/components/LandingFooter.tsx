
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t("common:brandName")}</h3>
            <p className="text-muted-foreground">{t("LandingPage:footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("LandingPage:footer.product.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.features")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.product.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("LandingPage:footer.company.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.about")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.team")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("LandingPage:footer.legal.title")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("LandingPage:footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>
            © {currentYear} {t("common:brandName")}. {t("LandingPage:footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
