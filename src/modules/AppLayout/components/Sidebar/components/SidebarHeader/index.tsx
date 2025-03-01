
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
      "p-4 border-b border-sidebar-border flex items-center justify-between transition-all duration-300",
      isMobile && !isExpanded && "border-none"
    )}>
      <h1 
        className={cn(
          "text-xl font-bold text-sidebar-foreground transition-all duration-300 overflow-hidden",
          (!isExpanded && !isMobile && !isHovering) && "opacity-0 w-0"
        )}
      >
        {t('common:brandName')}
      </h1>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="bg-transparent hover:bg-sidebar-accent transition-colors rounded-full p-1"
        aria-label={isExpanded ? t('AppLayout:sidebar.collapse') : t('AppLayout:sidebar.expand')}
      >
        <ToggleIcon 
          size={20} 
          className="text-sidebar-foreground" 
        />
      </Button>
    </div>
  );
};
