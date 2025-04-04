
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "../common/IconButton";
import { 
  Section, 
  Container, 
  Heading, 
  Text
} from "@/modules/LandingPage/styles";

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

  return (
    <Section variant="hero" background="hero" className="relative overflow-hidden">
      <Container size="default">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Heading level="h1" variant="gradient" className="md:text-4xl">
              {t("hero.title")}
            </Heading>
            
            <Text variant="muted" size="base" className="max-w-xl">
              {t("hero.subtitle")}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <IconButton asChild>
                <Link to="/signup">
                  {t("hero.cta.primary")} 
                  <ArrowRight />
                </Link>
              </IconButton>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/features">
                  {t("hero.cta.secondary")}
                </Link>
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
      </Container>
    </Section>
  );
};
