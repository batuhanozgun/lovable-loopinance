
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
import { CSS_CLASSES, SPACING, TRANSITION } from '../../constants';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.QuickActions');
  const { isExpanded, showQuickActions, toggleQuickActions, isMobile, isHovering } = useSidebarContext();
  
  logger.debug('QuickActions rendered', { isExpanded, showQuickActions, isMobile, isHovering });

  // Daraltılmış ve hover olmayan durumda tooltip göster
  if (!isExpanded && !isMobile && !isHovering) {
    return (
      <div className={cn(
        SPACING.SECTION,
        "border-t",
        CSS_CLASSES.COLORS.BORDER,
        CSS_CLASSES.TRANSITIONS.BASE
      )}>
        <TooltipProvider delayDuration={TRANSITION.TOOLTIP_DELAY}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "w-full",
                  CSS_CLASSES.COLLAPSED.ICON_ONLY,
                  CSS_CLASSES.COLORS.TEXT,
                  CSS_CLASSES.COLORS.ACCENT_HOVER
                )}
                onClick={toggleQuickActions}
              >
                {showQuickActions ? <X size={SPACING.ICON_SIZE} /> : <Plus size={SPACING.ICON_SIZE} />}
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
      SPACING.SECTION,
      "border-t",
      CSS_CLASSES.COLORS.BORDER,
      CSS_CLASSES.TRANSITIONS.BASE,
      // İçerik transition sınıflarını değiştirerek daha iyi geçiş sağlıyoruz
      (!isExpanded && !isHovering && !isMobile) && "opacity-0 invisible",
      isMobile && !isExpanded && "hidden"
    )}>
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "w-full",
          CSS_CLASSES.COLORS.TEXT,
          CSS_CLASSES.COLORS.ACCENT_HOVER,
          CSS_CLASSES.TRANSITIONS.BASE,
          (isExpanded || isHovering) ? CSS_CLASSES.COLLAPSED.WITH_TEXT : CSS_CLASSES.COLLAPSED.ICON_ONLY
        )}
        onClick={toggleQuickActions}
      >
        {showQuickActions ? <X size={SPACING.ICON_SIZE} /> : <Plus size={SPACING.ICON_SIZE} />}
        {(isExpanded || isHovering) && (
          <span className={CSS_CLASSES.TRANSITIONS.OPACITY}>
            {t('AppLayout:sidebar.quickActions')}
          </span>
        )}
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
