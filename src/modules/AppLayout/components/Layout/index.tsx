
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { MobileHeader } from '../MobileHeader';
import { BottomNav } from '../BottomNav';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SidebarProvider } from '../Sidebar/context/SidebarContext';

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
        <MobileHeader />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-background pb-16 md:pb-0">
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
};
