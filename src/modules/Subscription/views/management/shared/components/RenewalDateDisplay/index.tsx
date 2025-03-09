
import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ISubscriptionSummary } from '../../../../../types/ISubscription';
import { formatRenewalDate } from '../../utils/formatters';
import { useSubscriptionLocale } from '../../hooks/useSubscriptionLocale';

interface RenewalDateDisplayProps {
  subscription: ISubscriptionSummary | null;
  showIcon?: boolean;
  className?: string;
}

export const RenewalDateDisplay: React.FC<RenewalDateDisplayProps> = ({ 
  subscription, 
  showIcon = true,
  className = ''
}) => {
  const { t } = useTranslation(['Subscription']);
  const { locale } = useSubscriptionLocale();
  
  if (!subscription || !subscription.expiresAt) return null;
  
  const formattedDate = formatRenewalDate(subscription, locale);
  
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {showIcon && <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />}
      <span>{t('Subscription:info.renewalDate', { date: formattedDate })}</span>
    </div>
  );
};
