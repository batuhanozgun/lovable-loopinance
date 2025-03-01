
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TRANSITION_DURATION } from '../../components/SidebarNav';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.QuickActions');
  const { isExpanded, showQuickActions, toggleQuickActions, isMobile, isHovering } = useSidebarContext();
  
  logger.debug('QuickActions rendered', { isExpanded, showQuickActions, isMobile, isHovering });

  // Daraltılmış ve hover olmayan durumda tooltip göster
  if (!isExpanded && !isMobile && !isHovering) {
    return (
      <div className={`px-3 py-2 border-t border-sidebar-border transition-all duration-${TRANSITION_DURATION}`}>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={toggleQuickActions}
              >
                {showQuickActions ? <X size={18} /> : <Plus size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('AppLayout:sidebar.quickActions')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Normal görünüm
  return (
    <div className={cn(
      `px-3 py-2 border-t border-sidebar-border transition-all duration-${TRANSITION_DURATION}`,
      (!isExpanded && !isHovering && !isMobile) && "opacity-0",
      isMobile && !isExpanded && "hidden"
    )}>
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          `w-full text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-${TRANSITION_DURATION}`,
          (isExpanded || isHovering) ? "justify-between" : "justify-center"
        )}
        onClick={toggleQuickActions}
      >
        {(isExpanded || isHovering) && <span>{t('AppLayout:sidebar.quickActions')}</span>}
        {showQuickActions ? <X size={18} /> : <Plus size={18} />}
      </Button>

      {/* QuickActions menüsü gelecekte buraya eklenecek */}
      {showQuickActions && (isExpanded || isHovering) && (
        <div className="mt-2 p-2 bg-sidebar-accent rounded-md animate-fade-in">
          <p className="text-sm text-sidebar-foreground">{t('AppLayout:sidebar.comingSoon')}</p>
        </div>
      )}
    </div>
  );
};
