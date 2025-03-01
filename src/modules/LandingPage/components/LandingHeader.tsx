
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export const LandingHeader = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm py-4 px-6 flex items-center justify-between shadow-sm border-b z-50">
      <div className="flex items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-[rgba(84,85,89,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(185,100%,15%,1)] bg-clip-text text-transparent">{t("common:brandName")}</span>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.home")}
        </Link>
        <Link to="#features" className="text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.features")}
        </Link>
        <Link to="#about" className="text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.about")}
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <LanguageSelector variant="ghost" size="sm" />
        <ThemeToggle variant="ghost" size="sm" />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">{t("LandingPage:nav.login")}</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signup">{t("LandingPage:nav.signup")}</Link>
        </Button>
      </div>
    </header>
  );
};
