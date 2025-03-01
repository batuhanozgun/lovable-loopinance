
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export const LandingHeader = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[rgba(250,250,250,0.85)] via-[rgba(108,154,229,0.85)] to-[rgba(0,140,158,0.85)] dark:from-[hsla(210,13%,40%,0.75)] dark:via-[hsla(185,94%,7%,0.75)] dark:to-[hsla(0,100%,4%,0.75)] backdrop-blur-sm py-4 px-6 flex items-center justify-between shadow-sm border-b z-50">
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent">{t("common:brandName")}</span>
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
