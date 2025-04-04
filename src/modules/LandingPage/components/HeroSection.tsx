
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { IconButton } from "@/modules/LandingPage/components/common/IconButton";

export const HeroSection = () => {
  const { t } = useTranslation("LandingPage");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tema durumunu izle
  useEffect(() => {
    // İlk yüklemede tema durumunu kontrol et
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Sayfa yüklendiğinde tema durumunu kontrol et
    checkTheme();

    // Tema değişimini izle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Temizlik
    return () => observer.disconnect();
  }, []);

  return <section className="py-12 px-4 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("hero.title")}</h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-xl">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Link'i IconButton içine doğrudan yerleştirmek yerine, önce Link oluşturup sonra IconButton içinde kullanıyoruz */}
            <Link to="/signup">
              <IconButton>
                {t("hero.cta.primary")}
                <ArrowRight />
              </IconButton>
            </Link>
            <Button variant="outline" size="sm" asChild className="text-sm px-3 py-1 h-8">
              <Link to="/features">{t("hero.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted/80 backdrop-blur-sm rounded-lg overflow-hidden aspect-video flex items-center justify-center shadow-md relative">
          {/* Light mode görseli */}
          <img 
            src="/lovable-uploads/51df3ccf-f69e-454f-970f-2077bdace861.png" 
            alt={t("hero.image.alt")} 
            className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* Dark mode görseli */}
          <img 
            src="/lovable-uploads/e9f8067e-6751-4920-b74e-8b5e742a2f3c.png" 
            alt={t("hero.image.alt")} 
            className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </section>;
};
