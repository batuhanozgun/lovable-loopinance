
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { CSS_CLASSES, SPACING } from '../../constants';

export const SidebarHeader: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.SidebarHeader');
  const { isExpanded, isMobile, isHovering } = useSidebarContext();
  
  logger.debug('SidebarHeader rendered', { isExpanded, isMobile, isHovering });

  return (
    <div className={cn(
      SPACING.SECTION,
      "border-b flex items-center justify-center", 
      CSS_CLASSES.COLORS.BORDER,
      CSS_CLASSES.TRANSITIONS.BASE,
      isMobile && !isExpanded && "border-none"
    )}>
      <h1 
        className={cn(
          "text-xl font-bold overflow-hidden bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent",
          CSS_CLASSES.TRANSITIONS.BASE,
          (!isExpanded && !isMobile && !isHovering) && "opacity-0 w-0"
        )}
      >
        {t('common:brandName')}
      </h1>
    </div>
  );
};
