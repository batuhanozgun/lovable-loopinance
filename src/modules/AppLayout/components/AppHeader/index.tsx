
import React from 'react';
import { cn } from '@/lib/utils';
import { appHeaderLogger } from '../../logging';
import { HeaderBranding } from './components/HeaderBranding';
import { HeaderActions } from './components/HeaderActions';

interface AppHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  actions,
  className
}) => {
  appHeaderLogger.debug('AppHeader rendered');

  return (
    <header className={cn(
      "flex items-center pl-3 border-b bg-background/95 backdrop-blur-sm shadow-sm",
      "sticky top-0 z-40 transition-all duration-200 h-12", 
      className
    )}>
      <div className="flex w-full items-center justify-between">
        {/* Sol kısım - Logo */}
        <div className="flex-shrink-0">
          <HeaderBranding />
        </div>
        
        {/* Sağ kısım - Eylemler (tema ve dil) */}
        <div className="flex items-center">
          <HeaderActions pageActions={actions} />
        </div>
      </div>
    </header>
  );
};
