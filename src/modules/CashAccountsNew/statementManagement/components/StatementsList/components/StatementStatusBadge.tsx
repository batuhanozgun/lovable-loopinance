
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface StatementStatusBadgeProps {
  status: 'OPEN' | 'CLOSED' | 'FUTURE';
  className?: string;
}

export const StatementStatusBadge: React.FC<StatementStatusBadgeProps> = ({ 
  status,
  className
}) => {
  const { t } = useTranslation('StatementManagement');
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'OPEN':
        return {
          variant: 'default' as const,
          label: t('statements.status.open')
        };
      case 'CLOSED':
        return {
          variant: 'secondary' as const,
          label: t('statements.status.closed')
        };
      case 'FUTURE':
        return {
          variant: 'outline' as const,
          label: t('statements.status.future')
        };
      default:
        return {
          variant: 'default' as const,
          label: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={cn("text-xs py-0.5 h-5", className)}
    >
      {config.label}
    </Badge>
  );
};
