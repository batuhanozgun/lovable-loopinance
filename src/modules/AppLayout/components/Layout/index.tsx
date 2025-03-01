
import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation(['common']);
  const logger = LoggerService.getInstance('AppLayout');
  
  logger.debug('Layout component rendered');

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
};
