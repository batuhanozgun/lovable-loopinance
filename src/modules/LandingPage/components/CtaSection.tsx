
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  const { t } = useTranslation("LandingPage");
  
  return <section className="py-12 px-4 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">{t("cta.title")}</h2>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          {t("cta.description")}
        </p>
        <Button size="sm" asChild className="text-sm px-3 py-1 h-8">
          <Link to="/signup">
            {t("cta.button")} <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </section>;
};
