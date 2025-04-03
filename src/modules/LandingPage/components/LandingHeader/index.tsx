
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export const LandingHeader = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-background/70 backdrop-blur-md py-2 px-4 flex items-center justify-between shadow-sm border-b border-border/50 z-50">
      <div className="flex items-center">
        <Link to="/">
          <span className="text-lg font-bold bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent">{t("common:brandName")}</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-3">
        <Link to="/" className="text-xs text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.home")}
        </Link>
        <Link to="/features" className="text-xs text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.features")}
        </Link>
        <Link to="/pricing" className="text-xs text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.pricing")}
        </Link>
        <Link to="/about" className="text-xs text-foreground hover:text-primary transition-colors">
          {t("LandingPage:nav.about")}
        </Link>
      </nav>
      <div className="flex items-center space-x-1.5">
        <LanguageSelector variant="ghost" size="sm" className="h-6 w-6 p-0" />
        <ThemeToggle variant="ghost" size="sm" className="h-6 w-6 p-0" />
        <Button variant="ghost" size="sm" asChild className="text-xs px-2 py-0.5 h-6">
          <Link to="/login">{t("LandingPage:nav.login")}</Link>
        </Button>
        <Button size="sm" asChild className="text-xs px-2 py-0.5 h-6">
          <Link to="/signup">{t("LandingPage:nav.signup")}</Link>
        </Button>
      </div>
    </header>
  );
};
