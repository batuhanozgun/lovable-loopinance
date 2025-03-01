
import React, { useEffect, useState } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from '../../Navigation';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';
import { TRANSITION, CSS_CLASSES } from '../../constants';

export const SidebarNav: React.FC = () => {
  const logger = LoggerService.getInstance('AppLayout.SidebarNav');
  const { isExpanded, isMobile, isHovering } = useSidebarContext();
  const [isVisible, setIsVisible] = useState(true);
  
  // Daraltılmış modda içeriğin görünürlüğünü yönet
  useEffect(() => {
    if (!isMobile) {
      if (!isExpanded && !isHovering) {
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
  }, [isExpanded, isMobile, isHovering]);
  
  logger.debug('SidebarNav rendered', { isExpanded, isMobile, isHovering, isVisible });

  return (
    <div className={cn(
      "flex-1 overflow-y-auto",
      CSS_CLASSES.TRANSITIONS.BASE,
      // Hover veya genişletilmiş durumda göster, değilse gizle
      (!isExpanded && !isHovering && !isMobile) 
        ? CSS_CLASSES.COLLAPSED.CONTENT_HIDDEN 
        : CSS_CLASSES.COLLAPSED.CONTENT_VISIBLE,
      // Mobil modda, daraltılmışken tamamen gizle
      isMobile && !isExpanded && "hidden"
    )}>
      <Navigation />
    </div>
  );
};
