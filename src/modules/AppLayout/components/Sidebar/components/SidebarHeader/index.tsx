
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
          "text-xl font-bold overflow-hidden",
          CSS_CLASSES.COLORS.TEXT,
          CSS_CLASSES.TRANSITIONS.BASE,
          (!isExpanded && !isMobile && !isHovering) && "opacity-0 w-0"
        )}
      >
        {t('common:brandName')}
      </h1>
    </div>
  );
};
