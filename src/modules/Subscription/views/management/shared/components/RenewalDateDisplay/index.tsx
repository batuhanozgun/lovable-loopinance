
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { useSubscriptionLocale } from '../../hooks/useSubscriptionLocale';
import { formatDate } from '../../utils/formatters';

interface RenewalDateDisplayProps {
  expiresAt: Date | null;
  showIcon?: boolean;
  className?: string;
}

export const RenewalDateDisplay: React.FC<RenewalDateDisplayProps> = ({
  expiresAt,
  showIcon = true,
  className = ""
}) => {
  const { t } = useTranslation(['Subscription']);
  const { locale } = useSubscriptionLocale();
  
  if (!expiresAt) return null;
  
  return (
    <div className={`flex items-center ${className}`}>
      {showIcon && <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />}
      <span>{t('Subscription:info.renewalDate', { 
        date: formatDate(expiresAt, locale) 
      })}</span>
    </div>
  );
};
