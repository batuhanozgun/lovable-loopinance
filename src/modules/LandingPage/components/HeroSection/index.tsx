
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const { t } = useTranslation(["LandingPage", "common"]);
  
  return (
    <section className="px-4 py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-muted/50 opacity-30 z-0"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">{t("hero.cta.primary")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features" className="inline-flex items-center">
                {t("hero.cta.secondary")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-8 shadow-xl rounded-lg overflow-hidden border">
          <img 
            src="/lovable-uploads/e9f8067e-6751-4920-b74e-8b5e742a2f3c.png" 
            alt="Loopinance Dashboard" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
