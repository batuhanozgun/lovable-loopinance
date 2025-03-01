
import React, { useCallback } from 'react';
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
import { CSS_CLASSES, SPACING, TRANSITION } from './constants';

export const Navigation: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Navigation');
  const location = useLocation();
  const { isExpanded, isMobile, toggleSidebar } = useSidebarContext();
  
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
    isMobile
  });

  // Navigasyon elemanına tıklandığında mobil görünümde sidebar'ı kapat
  const handleNavClick = useCallback(() => {
    if (isMobile && isExpanded) {
      logger.debug('Navigation item clicked in mobile view, closing sidebar');
      toggleSidebar();
    }
  }, [isMobile, isExpanded, toggleSidebar, logger]);

  // Daraltılmış modda tooltip göster (isHovering kaldırıldı)
  const shouldShowTooltip = !isExpanded && !isMobile;

  return (
    <nav className={cn(
      SPACING.CONTAINER,
      "space-y-2",
      CSS_CLASSES.TRANSITIONS.BASE,
      (!isExpanded && !isMobile) && "items-center"
    )}>
      <TooltipProvider delayDuration={TRANSITION.TOOLTIP_DELAY}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          // Daraltılmış durumda tooltip göster
          if (shouldShowTooltip) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center w-full rounded-md",
                      CSS_CLASSES.COLLAPSED.ICON_ONLY,
                      CSS_CLASSES.COLORS.TEXT,
                      CSS_CLASSES.COLORS.ACCENT_HOVER,
                      SPACING.NAV_ITEM,
                      CSS_CLASSES.TRANSITIONS.BASE,
                      isActive && cn(CSS_CLASSES.COLORS.ACCENT, CSS_CLASSES.COLORS.PRIMARY, "font-medium")
                    )}
                  >
                    <IconComponent size={SPACING.ICON_SIZE} className={CSS_CLASSES.COLLAPSED.ICON} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          
          // Normal görünüm (genişletilmiş)
          return (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={handleNavClick}
              className={cn(
                "flex items-center w-full gap-3 rounded-md",
                CSS_CLASSES.COLORS.TEXT,
                CSS_CLASSES.COLORS.ACCENT_HOVER,
                SPACING.NAV_ITEM,
                CSS_CLASSES.TRANSITIONS.BASE,
                isActive && cn(CSS_CLASSES.COLORS.ACCENT, CSS_CLASSES.COLORS.PRIMARY, "font-medium")
              )}
            >
              <IconComponent size={SPACING.ICON_SIZE} className="flex-shrink-0" />
              <span className={cn(
                CSS_CLASSES.TRANSITIONS.OPACITY,
                (!isExpanded && !isMobile) ? CSS_CLASSES.COLLAPSED.TEXT_HIDDEN : CSS_CLASSES.COLLAPSED.TEXT_VISIBLE
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};
