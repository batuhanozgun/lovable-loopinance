
import React, { useEffect, useState } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Navigation } from '../../Navigation';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';

// Tüm sidebar komponentleri için standart transition değerleri
export const TRANSITION_DURATION = 300; // ms cinsinden

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
        }, TRANSITION_DURATION); // transition süresi
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
      "flex-1 overflow-y-auto transition-all",
      `duration-${TRANSITION_DURATION}`,
      // Hover olduğunda da içeriği hemen göster
      (!isExpanded && !isHovering && !isMobile) ? "opacity-0" : "opacity-100",
      isMobile && !isExpanded && "hidden"
    )}>
      <Navigation />
    </div>
  );
};
