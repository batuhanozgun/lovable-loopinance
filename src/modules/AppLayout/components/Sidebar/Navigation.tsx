
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
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
import { getNavigationItems, NavigationItem } from './config/navigationItems';

/**
 * Sidebar için ana navigasyon bileşeni.
 * İkonlar ve yönlendirmeleri içerir, erişim kontrolünü yönetir.
 */
export const Navigation: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.Navigation');
  const location = useLocation();
  const navigate = useNavigate();
  const { isExpanded, isMobile, toggleSidebar } = useSidebarContext();
  const { canNavigateTo, isDialogOpen, restrictedModuleName, closeDialog } = useAccessControl();
  
  // Navigation öğelerini al (dış konfigürasyon dosyasından)
  const navItems = getNavigationItems();
  
  logger.debug('Navigation component rendered', { 
    currentPath: location.pathname, 
    isExpanded, 
    isMobile
  });

  /**
   * Navigasyon elemanına tıklandığında yönlendirme ve erişim kontrolü yap
   * Mobil görünümde sidebar'ı otomatik kapat
   */
  const handleNavClick = useCallback((e: React.MouseEvent, item: NavigationItem) => {
    e.preventDefault(); // Önce varsayılan davranışı engelle
    
    // Erişim kontrolü
    if (canNavigateTo(item.path, t(item.label))) {
      navigate(item.path);
      
      if (isMobile && isExpanded) {
        logger.debug('Navigation item clicked in mobile view, closing sidebar');
        toggleSidebar();
      }
    }
  }, [isMobile, isExpanded, toggleSidebar, logger, canNavigateTo, navigate, t]);

  // Daraltılmış modda tooltip göster
  const shouldShowTooltip = !isExpanded && !isMobile;

  /**
   * Navigasyon öğesi için CSS sınıflarını oluştur
   */
  const getNavItemClasses = (isActive: boolean, isCollapsed: boolean) => {
    // Tüm navigasyon öğeleri için temel sınıflar
    const baseClasses = cn(
      CSS_CLASSES.COLORS.TEXT,
      CSS_CLASSES.COLORS.ACCENT_HOVER,
      SPACING.NAV_ITEM,
      CSS_CLASSES.TRANSITIONS.BASE,
      isActive && cn(CSS_CLASSES.COLORS.ACCENT, CSS_CLASSES.COLORS.PRIMARY, "font-medium")
    );
    
    // Daraltılmış görünüm için ek sınıflar
    if (isCollapsed) {
      return cn(
        baseClasses,
        "flex items-center w-full rounded-md",
        CSS_CLASSES.COLLAPSED.ICON_ONLY
      );
    }
    
    // Normal görünüm için ek sınıflar
    return cn(
      baseClasses,
      "flex items-center w-full gap-3 rounded-md"
    );
  };

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
                    onClick={(e) => handleNavClick(e, item)}
                    className={getNavItemClasses(isActive, true)}
                  >
                    <IconComponent size={SPACING.ICON_SIZE} className={CSS_CLASSES.COLLAPSED.ICON} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50">
                  <p>{t(item.label)}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          
          // Normal görünüm (genişletilmiş)
          return (
            <a 
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className={getNavItemClasses(isActive, false)}
            >
              <IconComponent size={SPACING.ICON_SIZE} className="flex-shrink-0" />
              <span className={cn(
                CSS_CLASSES.TRANSITIONS.OPACITY,
                (!isExpanded && !isMobile) ? CSS_CLASSES.COLLAPSED.TEXT_HIDDEN : CSS_CLASSES.COLLAPSED.TEXT_VISIBLE
              )}>
                {t(item.label)}
              </span>
            </a>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};
