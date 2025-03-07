
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { appHeaderLogger } from '../../logging';
import { useLocation } from 'react-router-dom';
import { PAGE_TITLES } from './constants/header';
import { HeaderBranding } from './components/HeaderBranding';
import { HeaderTitle } from './components/HeaderTitle';
import { HeaderActions } from './components/HeaderActions';

interface AppHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  description,
  actions,
  className
}) => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const location = useLocation();
  
  // Mevcut sayfanın başlığını belirle
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return t(`AppLayout:${PAGE_TITLES.dashboard}`);
    } else if (path.includes('/analytics')) {
      return t(`AppLayout:${PAGE_TITLES.analytics}`);
    } else if (path.includes('/settings')) {
      return t(`AppLayout:${PAGE_TITLES.settings}`);
    } else if (path.includes('/profile')) {
      return t(`AppLayout:${PAGE_TITLES.profile}`);
    }
    
    return '';
  };

  // Eğer özel başlık verilmemişse, sayfa başlığını kullan
  const pageTitle = title || getCurrentPageTitle();
  
  appHeaderLogger.debug('AppHeader rendered', { currentPath: location.pathname, pageTitle });

  return (
    <header className={cn(
      "flex items-center justify-between px-4 py-2 border-b bg-background/80 backdrop-blur-sm",
      "sticky top-0 z-10 transition-all duration-200",
      className
    )}>
      <div className="flex w-full items-center justify-between md:justify-start md:space-x-8">
        <HeaderBranding />
        
        <div className="hidden md:block">
          <HeaderTitle 
            title={pageTitle} 
            showTimestamp={false} 
          />
        </div>
        
        <div className="flex items-center ml-auto">
          <HeaderActions pageActions={actions} />
        </div>
      </div>
      
      <div className="md:hidden w-full text-center absolute left-0 bottom-0 transform translate-y-full">
        {pageTitle && (
          <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-b-md">
            {pageTitle}
          </span>
        )}
      </div>
    </header>
  );
};
