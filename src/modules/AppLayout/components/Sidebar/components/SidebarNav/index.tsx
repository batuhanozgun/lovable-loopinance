
import React, { useEffect, useState } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from '../../Navigation';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { TRANSITION, CSS_CLASSES } from '../../constants';

export const SidebarNav: React.FC = () => {
  const logger = LoggerService.getInstance('AppLayout.SidebarNav');
  const { isExpanded, isMobile } = useSidebarContext();
  const [isVisible, setIsVisible] = useState(true);
  
  // Daraltılmış modda içeriğin görünürlüğünü yönet
  useEffect(() => {
    if (!isMobile) {
      if (!isExpanded) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, TRANSITION.DURATION); // transition süresi
        return () => clearTimeout(timer);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(isExpanded);
    }
  }, [isExpanded, isMobile]);
  
  logger.debug('SidebarNav rendered', { isExpanded, isMobile, isVisible });

  return (
    <div className={cn(
      "overflow-y-auto",
      CSS_CLASSES.TRANSITIONS.BASE,
      // İçerik geçişini daha iyi kontrol etmek için CSS class değişiklikleri
      (!isExpanded && !isMobile) 
        ? "opacity-90" // İkonları görünür tut ama metni gizle
        : CSS_CLASSES.COLLAPSED.CONTENT_VISIBLE,
      // Mobil modda, daraltılmışken tamamen gizle
      isMobile && !isExpanded && "hidden",
      // Smooth scrolling
      "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-sidebar-border hover:scrollbar-thumb-sidebar-accent",
      "-webkit-overflow-scrolling-touch"
    )}>
      <Navigation />
    </div>
  );
};
