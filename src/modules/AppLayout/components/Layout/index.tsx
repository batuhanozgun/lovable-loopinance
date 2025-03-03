
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { AppHeader } from '../AppHeader';
import { BottomNav } from '../BottomNav';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider } from '../Sidebar/context/SidebarContext';
import { PageContainer } from './components/PageContainer';
import { HEADER_HEIGHT } from '../AppHeader/constants/header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation(['common']);
  const logger = LoggerService.getInstance('AppLayout');
  
  logger.debug('Layout component rendered');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main 
            className="flex-1 bg-background pb-16 md:pb-0 flex flex-col"
            style={{ height: `calc(100vh - ${HEADER_HEIGHT.desktop}px)` }}
          >
            <PageContainer className="flex-1 overflow-y-auto">
              {children}
            </PageContainer>
          </main>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
};
