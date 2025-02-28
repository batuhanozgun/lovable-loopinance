import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export const HeroSection = () => {
  const {
    t
  } = useTranslation("landing");
  return <section className="py-20 px-6 bg-gradient-to-r from-[rgba(163,186,215,1)] via-[rgba(141,117,94,1)] to-[rgba(244,248,252,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]\n">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("hero.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("hero.subtitle")}</p>
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
        <div className="bg-muted/80 backdrop-blur-sm rounded-lg aspect-video flex items-center justify-center shadow-md">
          <div className="text-muted-foreground p-12 text-center">
            <p className="text-lg font-medium">{t("hero.image.alt")}</p>
          </div>
        </div>
      </div>
    </section>;
};