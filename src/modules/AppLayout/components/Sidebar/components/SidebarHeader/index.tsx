
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';

export const SidebarHeader: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.SidebarHeader');
  const { isExpanded, toggleSidebar, isMobile } = useSidebarContext();
  
  logger.debug('SidebarHeader rendered', { isExpanded, isMobile });

  // Toggle butonu için icon belirleme
  const ToggleIcon = isMobile 
    ? Menu 
    : isExpanded 
      ? ChevronLeft 
      : ChevronRight;

  return (
    <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
      <h1 
        className={cn(
          "text-xl font-bold text-sidebar-foreground transition-all duration-300",
          !isExpanded && !isMobile && "opacity-0 w-0 overflow-hidden"
        )}
      >
        {t('common:brandName')}
      </h1>
      
      <button
        onClick={toggleSidebar}
        className="p-1 rounded-md hover:bg-sidebar-accent transition-colors"
        aria-label={isExpanded ? t('AppLayout:sidebar.collapse') : t('AppLayout:sidebar.expand')}
      >
        <ToggleIcon 
          size={20} 
          className="text-sidebar-foreground" 
        />
      </button>
    </div>
  );
};
