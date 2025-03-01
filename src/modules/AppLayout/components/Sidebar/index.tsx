
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider, useSidebarContext } from './context/SidebarContext';
import { SidebarHeader } from './components/SidebarHeader';
import { SidebarNav } from './components/SidebarNav';
import { QuickActions } from './components/QuickActions';
import { UserActions } from './UserActions';
import { useSidebarResize } from './hooks/useSidebarResize';
import { cn } from '@/lib/utils';

// Inner component that uses the sidebar context
const SidebarContent: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Sidebar');
  const { 
    isExpanded, 
    isMobile, 
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSidebarContext();
  const { effectiveWidth } = useSidebarResize();
  
  logger.debug('Sidebar component rendered', { isExpanded, isMobile, effectiveWidth, isHovering });

  // Sidebar bileşeninin stilini dinamik olarak oluştur
  const sidebarStyles = {
    width: effectiveWidth,
    minWidth: effectiveWidth,
    transition: 'width 0.3s ease-in-out, min-width 0.3s ease-in-out, transform 0.3s ease-in-out',
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
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => useSidebarContext().toggleSidebar()}
          />
        )}
        
        <aside 
          className={cn(
            "fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 shadow-lg",
            isExpanded ? "animate-slide-in-left" : "animate-slide-out-left -translate-x-full"
          )}
          style={{ width: effectiveWidth }}
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
      className="relative h-screen bg-sidebar border-r border-sidebar-border flex flex-col shadow-sm"
      style={sidebarStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {sidebarContent}
    </aside>
  );
};

// Ana dışa aktarılan bileşen - Provider ile sarıyor
export const Sidebar: React.FC = () => {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
};
