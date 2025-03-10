
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

export const LandingHeader = () => {
  const { t } = useTranslation("LandingPage");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Loopinance
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-sm hover:text-primary transition-colors">
            {t("nav.features")}
          </Link>
          <Link to="/#pricing" className="text-sm hover:text-primary transition-colors">
            {t("nav.pricing")}
          </Link>
          <Link to="/#about" className="text-sm hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSelector />
          <Button variant="outline" asChild>
            <Link to="/login">{t("nav.login")}</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">{t("nav.signup")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button onClick={toggleMenu} className="p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              to="/#features"
              className="px-2 py-1 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              {t("nav.features")}
            </Link>
            <Link
              to="/#pricing"
              className="px-2 py-1 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              {t("nav.pricing")}
            </Link>
            <Link
              to="/#about"
              className="px-2 py-1 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              {t("nav.about")}
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <LanguageSelector />
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button className="w-full justify-center" asChild>
                <Link to="/signup">{t("nav.signup")}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
