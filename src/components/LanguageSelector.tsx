
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
    const currentLang = i18n.language || 'tr'; // Provide a fallback
    const newLang = currentLang.startsWith("tr") ? "en" : "tr";
    
    // Dil değişimini uygula
    i18n.changeLanguage(newLang);
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem("i18nextLng", newLang);
    
    // Kullanıcıya bildirim göster
    toast({
      title: newLang === "en" ? "Language changed" : "Dil değiştirildi",
      description: newLang === "en" ? "Using English now" : "Şimdi Türkçe kullanılıyor",
      duration: 2000,
    });
  };

  // Add fallbacks for the language display
  const currentLanguage = i18n.language || 'tr';
  const displayText = currentLanguage.startsWith("tr") ? "EN" : "TR";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className={cn("h-8 w-8 rounded-full text-xs font-medium hover:bg-muted/60", className)}
      {...props}
    >
      {displayText}
    </Button>
  );
};
