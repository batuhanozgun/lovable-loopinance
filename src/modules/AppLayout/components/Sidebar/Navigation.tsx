
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Home, BarChart3, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Navigation');
  const location = useLocation();
  
  const navItems = [
    { 
      label: t('AppLayout:navigation.dashboard'), 
      path: '/dashboard', 
      icon: Home 
    },
    { 
      label: t('AppLayout:navigation.analytics'), 
      path: '/analytics', 
      icon: BarChart3 
    },
    { 
      label: t('AppLayout:navigation.settings'), 
      path: '/settings', 
      icon: Settings 
    },
    { 
      label: t('AppLayout:navigation.profile'), 
      path: '/profile', 
      icon: User 
    },
  ];
  
  logger.debug('Navigation component rendered', { currentPath: location.pathname });

  return (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path} 
            className={cn(
              "flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-colors",
              isActive && "bg-sidebar-accent text-sidebar-foreground-active font-medium"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
