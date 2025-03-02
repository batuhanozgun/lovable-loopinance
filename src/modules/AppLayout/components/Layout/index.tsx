
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { AppHeader } from '../AppHeader';
import { BottomNav } from '../BottomNav';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider } from '../Sidebar/context/SidebarContext';
import { PageContainer } from './components/PageContainer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation(['common']);
  const logger = LoggerService.getInstance('AppLayout');
  
  logger.debug('Layout component rendered');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 h-[calc(100vh-64px)]">
          <Sidebar />
          <main className="flex-1 bg-background pb-16 md:pb-0 flex flex-col overflow-hidden">
            <PageContainer className="flex-1">
              {children}
            </PageContainer>
          </main>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
};
