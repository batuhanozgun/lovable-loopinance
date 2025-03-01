
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps extends Omit<ButtonProps, "onClick"> {
  className?: string;
}

export const LanguageSelector = ({ className, ...props }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang).then(() => {
      localStorage.setItem("preferredLanguage", newLang);
      // Dil değişimini anında etkili kıl
      window.location.reload();
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(className)}
      {...props}
    >
      {i18n.language === "tr" ? "EN" : "TR"}
    </Button>
  );
};
