
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LanguageSelectorProps extends Omit<ButtonProps, "onClick"> {
  className?: string;
}

export const LanguageSelector = ({ className, ...props }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "tr" ? "en" : "tr";
    
    // Dil değişimini uygula
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
    
    // Kullanıcıya bildirim göster
    toast({
      title: newLang === "en" ? "Language changed" : "Dil değiştirildi",
      description: newLang === "en" ? "Using English now" : "Şimdi Türkçe kullanılıyor",
      duration: 2000,
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
