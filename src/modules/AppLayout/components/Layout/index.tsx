
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { AppHeader } from '../AppHeader';
import { BottomNav } from '../BottomNav';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider, useSidebarContext } from '../Sidebar/context/SidebarContext';
import { PageContainer } from './components/PageContainer';
import { useSidebarResize } from '../Sidebar/hooks/useSidebarResize';
import { HEADER_HEIGHT } from '../AppHeader/constants/header';

// İç ComponentWrapper bileşeni
const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { isExpanded, isMobile } = useSidebarContext();
  const { effectiveWidth } = useSidebarResize();
  
  // İçeriği sidebar genişliğine göre ayarla (sadece desktop modunda)
  const mainStyle = !isMobile ? {
    marginLeft: isExpanded ? effectiveWidth : effectiveWidth
  } : undefined;
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <AppHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main 
          className="flex-1 bg-background pb-16 md:pb-0 flex flex-col transition-all duration-300"
          style={mainStyle}
        >
          <PageContainer className="flex-1 overflow-y-auto">
            {children}
          </PageContainer>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

// Ana Layout bileşeni
export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation(['common']);
  const logger = LoggerService.getInstance('AppLayout');
  
  logger.debug('Layout component rendered');

  return (
    <SidebarProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
};
