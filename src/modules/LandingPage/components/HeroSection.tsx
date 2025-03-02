
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const { t } = useTranslation("LandingPage");
  
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("hero.title")}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                {t("hero.cta.primary")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="#features">{t("hero.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted/80 backdrop-blur-sm rounded-lg overflow-hidden aspect-video flex items-center justify-center shadow-md dark:shadow-black/40">
          <img 
            src="/lovable-uploads/43cfc13f-b8aa-4084-a8bc-754258bdc616.png" 
            alt={t("hero.image.alt")} 
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>
      </div>
    </section>
  );
};
