
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useSidebarContext } from './context/SidebarContext';
import { SidebarNav } from './components/SidebarNav';
import { QuickActions } from './components/QuickActions';
import { UserActions } from './UserActions';
import { useSidebarResize } from './hooks/useSidebarResize';
import { cn } from '@/lib/utils';
import { TRANSITION, Z_INDEX, CSS_CLASSES, SPACING } from './constants';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Sidebar');
  const { 
    isExpanded, 
    isMobile,
    toggleSidebar,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSidebarContext();
  const { effectiveWidth } = useSidebarResize();
  
  logger.debug('Sidebar component rendered', { isExpanded, isMobile, effectiveWidth });

  // Backdrop tıklaması için handler - useCallback ile sarmalıyoruz
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    logger.debug('Backdrop clicked, closing sidebar');
    toggleSidebar();
  }, [toggleSidebar, logger]);

  // Sidebar bileşeninin stilini dinamik olarak oluştur
  const sidebarStyles = {
    width: effectiveWidth,
    minWidth: effectiveWidth,
    transition: `width ${TRANSITION.DURATION}ms ${TRANSITION.EASING}, min-width ${TRANSITION.DURATION}ms ${TRANSITION.EASING}, transform ${TRANSITION.DURATION}ms ${TRANSITION.EASING}`,
  };

  // Mobil ekranda kapalıyken overflow'u gizle, açıkken göster
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded, isMobile]);

  // Toggle butonu için render
  const renderToggleButton = () => {
    // Mobil görünümde toggle butonu gösterme
    if (isMobile) return null;

    return (
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 translate-x-1/2 top-4 z-20",
                "h-8 w-8 rounded-full p-0 flex justify-center items-center",
                "bg-background/80 backdrop-blur-sm border shadow-sm",
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
    );
  };

  // Sidebar içeriği - height kontrolü eklendi
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <SidebarNav />
      </div>
      <div>
        <QuickActions />
        <UserActions />
      </div>
    </div>
  );

  // Mobile görünüm (overlay)
  if (isMobile) {
    return (
      <>
        {/* Overlay backdrop - sidebar açıkken gösterilir */}
        {isExpanded && (
          <div 
            className={cn(
              "fixed inset-0 bg-black/50 animate-fade-in cursor-pointer",
              `z-[${Z_INDEX.BACKDROP}]`
            )}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
        
        <aside 
          className={cn(
            "fixed top-16 left-0 h-[calc(100vh-128px)] flex flex-col shadow-lg",
            CSS_CLASSES.COLORS.BG,
            "border-r",
            CSS_CLASSES.COLORS.BORDER,
            `z-[${Z_INDEX.SIDEBAR_MOBILE}]`,
            isExpanded ? "animate-slide-in-left" : "animate-slide-out-left -translate-x-full"
          )}
          style={{ 
            width: effectiveWidth
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop görünüm
  return (
    <aside 
      className={cn(
        "h-[calc(100vh-64px)] flex flex-col shadow-sm",
        CSS_CLASSES.COLORS.BG,
        "border-r",
        CSS_CLASSES.COLORS.BORDER
      )}
      style={sidebarStyles}
    >
      {/* Toggle butonu */}
      {renderToggleButton()}
      
      {sidebarContent}
    </aside>
  );
};
