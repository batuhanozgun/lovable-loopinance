
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';

interface HeaderTitleProps {
  title?: string;
  description?: string;
  timestamp?: string;
  className?: string;
  showTimestamp?: boolean;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  description,
  timestamp,
  className,
  showTimestamp = true
}) => {
  const { t, i18n } = useTranslation(['common', 'Dashboard']);
  const currentLanguage = i18n.language;
  const dateLocale = currentLanguage === 'tr' ? tr : enUS;
  
  // Eğer açıklama verilmemişse, günün tarihini formatlayalım
  const defaultDescription = format(
    new Date(),
    currentLanguage === 'tr' ? "d MMMM yyyy, EEEE" : "EEEE, MMMM d, yyyy",
    { locale: dateLocale }
  );
  
  const descriptionText = description || defaultDescription;
  const titleText = title || t('common:welcome');
  const timestampText = timestamp || format(new Date(), "HH:mm");

  // Sadece başlığı göster veya başlık ve diğer bilgileri göster
  if (!showTimestamp && !description) {
    return (
      <div className={className}>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{titleText}</h1>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{titleText}</h1>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground">
          {descriptionText}
        </p>
      )}
      
      {showTimestamp && (
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock size={14} className="mr-1" />
          <span>
            {t("Dashboard:lastUpdated", { time: timestampText })}
          </span>
        </div>
      )}
    </div>
  );
};
