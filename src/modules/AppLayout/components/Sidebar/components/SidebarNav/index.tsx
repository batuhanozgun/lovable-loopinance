
import React from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from '../../Navigation';
import { useSidebarContext } from '../../context/SidebarContext';

export const SidebarNav: React.FC = () => {
  const logger = LoggerService.getInstance('AppLayout.SidebarNav');
  const { isExpanded } = useSidebarContext();
  
  logger.debug('SidebarNav rendered', { isExpanded });

  return (
    <div className="flex-1 overflow-y-auto">
      <Navigation />
    </div>
  );
};
