
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebarContext } from '../Sidebar/context/SidebarContext';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { useLocation } from 'react-router-dom';

export const MobileHeader: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.MobileHeader');
  const { toggleSidebar } = useSidebarContext();
  const location = useLocation();

  // Mevcut sayfanın başlığını belirle
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return t('AppLayout:navigation.dashboard');
    } else if (path.includes('/analytics')) {
      return t('AppLayout:navigation.analytics');
    } else if (path.includes('/settings')) {
      return t('AppLayout:navigation.settings');
    } else if (path.includes('/profile')) {
      return t('AppLayout:navigation.profile');
    }
    
    return '';
  };

  const pageTitle = getCurrentPageTitle();
  
  logger.debug('MobileHeader rendered', { currentPath: location.pathname });

  return (
    <header className="md:hidden flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('AppLayout:sidebar.toggleMenu')}
          onClick={() => toggleSidebar()}
          className="text-foreground"
        >
          <Menu size={24} />
        </Button>
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent">
          {t('common:brandName')}
        </h1>
        {pageTitle && (
          <span className="text-xs text-muted-foreground">
            {pageTitle}
          </span>
        )}
      </div>
      
      <div className="w-10">
        {/* Bu alan gelecekteki ek özellikler için ayrılmıştır */}
      </div>
    </header>
  );
};
