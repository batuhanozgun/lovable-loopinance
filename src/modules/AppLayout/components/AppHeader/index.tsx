
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
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
  const logger = LoggerService.getInstance('AppLayout.AppHeader');
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
  
  logger.debug('AppHeader rendered', { currentPath: location.pathname, pageTitle });

  return (
    <header className={cn(
      "flex items-center justify-between px-4 py-4 border-b bg-gradient-to-r from-[rgba(250,250,250,0.85)] via-[rgba(108,154,229,0.85)] to-[rgba(0,140,158,0.85)] dark:from-[hsla(210,13%,40%,0.75)] dark:via-[hsla(185,94%,7%,0.75)] dark:to-[hsla(0,100%,4%,0.75)] backdrop-blur-sm",
      "sticky top-0 z-[30] transition-all duration-200", // z-index değeri 30 olarak güncellendi
      className
    )}>
      <div className="flex w-full items-center justify-between md:justify-start md:space-x-8">
        <HeaderBranding />
        
        <div className="hidden md:block">
          <HeaderTitle 
            title={pageTitle} 
            description={description}
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
