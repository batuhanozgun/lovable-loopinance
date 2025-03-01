
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
  const { isExpanded, isMobile } = useSidebarContext();
  const { sidebarWidth } = useSidebarResize();
  
  logger.debug('Sidebar component rendered', { isExpanded, isMobile, sidebarWidth });

  // Sidebar bileşeninin stilini dinamik olarak oluştur
  const sidebarStyles = {
    width: sidebarWidth,
    minWidth: sidebarWidth,
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
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => useSidebarContext().toggleSidebar()}
          />
        )}
        
        <aside 
          className={cn(
            "fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-transform duration-300",
            isExpanded ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ width: '16rem' }}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop görünüm
  return (
    <aside 
      className="relative h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
      style={sidebarStyles}
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
