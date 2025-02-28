import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
export const LandingHeader = () => {
  const {
    t
  } = useTranslation("landing");
  return <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm py-4 px-6 flex items-center justify-between shadow-sm border-b z-50">
      <div className="flex items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-[rgba(192,130,130,1)] via-[rgba(224,255,224,1)] to-[rgba(0,38,77,1)] dark:from-[hsla(0,15%,14%,1)] dark:via-[hsla(228,54%,16%,1)] dark:to-[hsla(211,27%,35%,1)] bg-clip-text text-transparent">{t("common:brandName")}</span>
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
        <LanguageSelector variant="ghost" size="sm" />
        <ThemeToggle variant="ghost" size="sm" />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">{t("nav.login")}</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signup">{t("nav.signup")}</Link>
        </Button>
      </div>
    </header>;
};