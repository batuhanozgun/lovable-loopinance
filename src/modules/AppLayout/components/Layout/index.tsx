
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { AppHeader } from '../AppHeader';
import { BottomNav } from '../BottomNav';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider } from '../Sidebar/context/SidebarContext';
import { PageContainer } from './components/PageContainer';
import { useSidebarResize } from '../Sidebar/hooks/useSidebarResize';

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
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-background pb-16 md:pb-0 flex flex-col mt-16">
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
