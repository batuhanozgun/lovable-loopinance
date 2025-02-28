import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export const CtaSection = () => {
  const {
    t
  } = useTranslation("landing");
  return <section className="py-20 px-6 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t("cta.description")}
        </p>
        <Button size="lg" asChild>
          <Link to="/signup">
            {t("cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>;
};