
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Home, BarChart3, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarContext } from './context/SidebarContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Navigation: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Navigation');
  const location = useLocation();
  const { isExpanded, isMobile, isHovering } = useSidebarContext();
  
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
  
  logger.debug('Navigation component rendered', { 
    currentPath: location.pathname, 
    isExpanded, 
    isMobile,
    isHovering
  });

  // Daraltılmış modda ve hover olmadığında tooltip göster
  const shouldShowTooltip = !isExpanded && !isMobile && !isHovering;

  return (
    <nav className={cn(
      "p-4 space-y-2 transition-all duration-300",
      (!isExpanded && !isHovering && !isMobile) && "items-center"
    )}>
      <TooltipProvider delayDuration={300}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          // Daraltılmış durumda tooltip göster (ve hover durumunda değilse)
          if (shouldShowTooltip) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center justify-center w-full text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-all duration-300",
                      isActive && "bg-sidebar-accent text-sidebar-primary font-medium"
                    )}
                  >
                    <IconComponent size={20} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          
          // Normal görünüm (genişletilmiş veya hover)
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "flex items-center w-full gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2 transition-all duration-300",
                isActive && "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
            >
              <IconComponent size={20} className="flex-shrink-0" />
              <span className="transition-opacity duration-300 truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};
