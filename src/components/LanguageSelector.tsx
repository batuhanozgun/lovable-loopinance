
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={className}
    >
      {i18n.language === "tr" ? "EN" : "TR"}
    </Button>
  );
};
