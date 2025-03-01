
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useSidebarContext } from './context/SidebarContext';
import { SidebarHeader } from './components/SidebarHeader';
import { SidebarNav } from './components/SidebarNav';
import { QuickActions } from './components/QuickActions';
import { UserActions } from './UserActions';
import { useSidebarResize } from './hooks/useSidebarResize';
import { cn } from '@/lib/utils';
import { TRANSITION, Z_INDEX, CSS_CLASSES } from './constants';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Sidebar');
  const { 
    isExpanded, 
    isMobile,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSidebarContext();
  const { effectiveWidth } = useSidebarResize();
  
  logger.debug('Sidebar component rendered', { isExpanded, isMobile, effectiveWidth });

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

  // Sidebar render edilirken gösterilecek UI
  const sidebarContent = (
    <>
      <SidebarHeader />
      <SidebarNav />
      <QuickActions />
      <UserActions />
    </>
  );

  // Mobile görünüm (overlay)
  if (isMobile) {
    return (
      <>
        {/* Overlay backdrop - sidebar açıkken gösterilir */}
        {isExpanded && (
          <div 
            className={cn(
              "fixed inset-0 bg-black/50 animate-fade-in",
              `z-[${Z_INDEX.BACKDROP}]`
            )}
            onClick={() => useSidebarContext().toggleSidebar()}
          />
        )}
        
        <aside 
          className={cn(
            "fixed top-0 left-0 h-screen flex flex-col shadow-lg",
            CSS_CLASSES.COLORS.BG,
            "border-r",
            CSS_CLASSES.COLORS.BORDER,
            `z-[${Z_INDEX.SIDEBAR_MOBILE}]`,
            isExpanded ? "animate-slide-in-left" : "animate-slide-out-left -translate-x-full",
            // Mobilde header altında başlamasını sağla
            "mt-16" // header yüksekliği kadar margin-top
          )}
          style={{ width: effectiveWidth, height: 'calc(100vh - 64px)' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop görünüm - mouseover ve mouseout event'leri kaldırıldı
  return (
    <aside 
      className={cn(
        "relative h-screen flex flex-col shadow-sm",
        CSS_CLASSES.COLORS.BG,
        "border-r",
        CSS_CLASSES.COLORS.BORDER
      )}
      style={sidebarStyles}
    >
      {sidebarContent}
    </aside>
  );
};
