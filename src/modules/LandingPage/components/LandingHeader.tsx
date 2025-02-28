
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const LandingHeader = () => {
  const { t, i18n } = useTranslation("landing");

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <header className="bg-background py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <span className="text-xl font-bold text-primary">{t("common:brandName")}</span>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-foreground hover:text-primary transition-colors">
          {t("nav.home")}
        </Link>
        <Link to="#features" className="text-foreground hover:text-primary transition-colors">
          {t("nav.features")}
        </Link>
        <Link to="#about" className="text-foreground hover:text-primary transition-colors">
          {t("nav.about")}
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleLanguage}
        >
          {i18n.language === "tr" ? "EN" : "TR"}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">{t("nav.login")}</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signup">{t("nav.signup")}</Link>
        </Button>
      </div>
    </header>
  );
};
