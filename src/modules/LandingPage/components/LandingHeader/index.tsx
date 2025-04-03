
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export const LandingHeader = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm py-3 px-4 flex items-center justify-between shadow-sm border-b z-50">
      <div className="flex items-center">
        <Link to="/">
          <span className="text-xl font-bold bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent">{t("common:brandName")}</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-4">
        <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.home")}
        </Link>
        <Link to="/#features" className="text-sm text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.features")}
        </Link>
        <Link to="/pricing" className="text-sm text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.pricing")}
        </Link>
        <Link to="/#about" className="text-sm text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.about")}
        </Link>
      </nav>
      <div className="flex items-center space-x-2">
        <LanguageSelector variant="ghost" size="sm" />
        <ThemeToggle variant="ghost" size="sm" />
        <Button variant="ghost" size="sm" asChild className="text-xs px-2 py-1 h-7">
          <Link to="/login">{t("LandingPage:nav.login")}</Link>
        </Button>
        <Button size="sm" asChild className="text-xs px-2 py-1 h-7">
          <Link to="/signup">{t("LandingPage:nav.signup")}</Link>
        </Button>
      </div>
    </header>
  );
};
