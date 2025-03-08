
import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Home, BarChart3, Settings, User, Wallet, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarContext } from './context/SidebarContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CSS_CLASSES, SPACING, TRANSITION } from './constants';
import { useAccessControl } from '@/modules/Subscription/hooks/useAccessControl';
import { AccessRestrictedDialog } from '@/modules/Subscription/components/AccessRestrictedDialog';

export const Navigation: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Navigation');
  const location = useLocation();
  const navigate = useNavigate();
  const { isExpanded, isMobile, toggleSidebar } = useSidebarContext();
  const { canNavigateTo, isDialogOpen, restrictedModuleName, closeDialog } = useAccessControl();
  
  const navItems = [
    { 
      label: t('AppLayout:navigation.dashboard'), 
      path: '/dashboard', 
      icon: Home 
    },
    { 
      label: t('AppLayout:navigation.accounts'), 
      path: '/accounts', 
      icon: Wallet 
    },
    { 
      label: t('AppLayout:navigation.budgets'), 
      path: '/budgets', 
      icon: Grid 
    },
    { 
      label: t('AppLayout:navigation.categories'), 
      path: '/categories', 
      icon: List 
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
  const handleNavClick = useCallback((e: React.MouseEvent, path: string, label: string) => {
    e.preventDefault(); // Önce varsayılan davranışı engelle
    
    // Erişim kontrolü
    if (canNavigateTo(path, label)) {
      navigate(path);
      
      if (isMobile && isExpanded) {
        logger.debug('Navigation item clicked in mobile view, closing sidebar');
        toggleSidebar();
      }
    }
  }, [isMobile, isExpanded, toggleSidebar, logger, canNavigateTo, navigate]);

  // Daraltılmış modda tooltip göster (isHovering kaldırıldı)
  const shouldShowTooltip = !isExpanded && !isMobile;

  return (
    <nav className={cn(
      SPACING.CONTAINER,
      "space-y-2",
      CSS_CLASSES.TRANSITIONS.BASE,
      (!isExpanded && !isMobile) && "items-center"
    )}>
      <AccessRestrictedDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        moduleName={restrictedModuleName} 
      />
      
      <TooltipProvider delayDuration={TRANSITION.TOOLTIP_DELAY}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          // Daraltılmış durumda tooltip göster
          if (shouldShowTooltip) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <a 
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path, item.label)}
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
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          
          // Normal görünüm (genişletilmiş)
          return (
            <a 
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.path, item.label)}
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
            </a>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};
