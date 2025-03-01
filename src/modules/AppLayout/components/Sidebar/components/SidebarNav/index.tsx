
import React, { useEffect, useState } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from '../../Navigation';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';

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
        }, 300); // transition süresi
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
      "flex-1 overflow-y-auto transition-opacity duration-300",
      (!isExpanded && !isHovering && !isMobile) && "opacity-0",
      isMobile && !isExpanded && "hidden"
    )}>
      <Navigation />
    </div>
  );
};
