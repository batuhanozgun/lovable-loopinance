
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CSS_CLASSES, SPACING } from '../../constants';

export const SidebarHeader: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.SidebarHeader');
  const { isExpanded, toggleSidebar, isMobile, isHovering } = useSidebarContext();
  
  logger.debug('SidebarHeader rendered', { isExpanded, isMobile, isHovering });

  // Toggle butonu için icon belirleme
  const ToggleIcon = isMobile 
    ? Menu 
    : isExpanded 
      ? ChevronLeft 
      : ChevronRight;

  return (
    <div className={cn(
      SPACING.SECTION,
      "border-b flex items-center justify-between", 
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
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "bg-transparent rounded-full p-1",
          CSS_CLASSES.COLORS.ACCENT_HOVER,
          "transition-colors"
        )}
        aria-label={isExpanded ? t('AppLayout:sidebar.collapse') : t('AppLayout:sidebar.expand')}
      >
        <ToggleIcon 
          size={SPACING.ICON_SIZE + 2} 
          className={CSS_CLASSES.COLORS.TEXT} 
        />
      </Button>
    </div>
  );
};
