
import React from "react";
import { useTranslation } from "react-i18next";
import { Clock, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";

const DashboardHeader: React.FC = () => {
  const { t, i18n } = useTranslation(["Dashboard", "common"]);
  const currentLanguage = i18n.language;
  const dateLocale = currentLanguage === 'tr' ? tr : enUS;
  
  // Günün tarihini formatlayalım
  const formattedDate = format(
    new Date(),
    currentLanguage === 'tr' ? "d MMMM yyyy, EEEE" : "EEEE, MMMM d, yyyy",
    { locale: dateLocale }
  );

  // Header için aksiyon butonları
  const headerActions = (
    <Button size="sm" className="gap-1">
      <Plus size={16} />
      {t('common:add')}
    </Button>
  );

  return (
    <PageHeader
      title={t("common:welcome")}
      description={formattedDate}
      actions={headerActions}
    >
      <div className="flex items-center text-xs text-muted-foreground">
        <Clock size={14} className="mr-1" />
        <span>
          {t("Dashboard:lastUpdated", {
            time: format(new Date(), "HH:mm")
          })}
        </span>
      </div>
    </PageHeader>
  );
};

export default DashboardHeader;
