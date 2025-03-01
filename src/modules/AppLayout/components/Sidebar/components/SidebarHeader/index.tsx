
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { CSS_CLASSES, SPACING, Z_INDEX } from '../../constants';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * @deprecated Bu bileşen artık kullanılmıyor. Toggle buton Sidebar bileşenine taşındı.
 * 
 * SidebarHeader - Sidebar'ın üst kısmında bulunan başlık ve daraltma butonu
 * Not: Bu bileşen artık kullanılmıyor, ancak referans için korundu.
 */
export const SidebarHeader: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.SidebarHeader');
  const { isExpanded, isMobile, isHovering, toggleSidebar } = useSidebarContext();
  
  logger.debug('SidebarHeader rendered - DEPRECATED', { isExpanded, isMobile, isHovering });

  return (
    <div className={cn(
      SPACING.SECTION,
      "border-b flex items-center justify-between relative", 
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
      
      {!isMobile && (
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full p-0 flex justify-center items-center",
                  CSS_CLASSES.TRANSITIONS.BASE,
                  "hover:bg-accent/50"
                )}
                onClick={toggleSidebar}
                aria-label={isExpanded 
                  ? t('AppLayout:sidebar.collapse') 
                  : t('AppLayout:sidebar.expand')
                }
              >
                {isExpanded ? (
                  <ChevronLeft size={16} className="text-sidebar-foreground" />
                ) : (
                  <ChevronRight size={16} className="text-sidebar-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isExpanded 
                ? t('AppLayout:sidebar.collapse') 
                : t('AppLayout:sidebar.expand')
              }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
