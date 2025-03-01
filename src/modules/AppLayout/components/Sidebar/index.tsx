
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from './Navigation';
import { UserActions } from './UserActions';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Sidebar');
  
  logger.debug('Sidebar component rendered');

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">{t('common:brandName')}</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Navigation />
      </div>
      
      <UserActions />
    </aside>
  );
};
