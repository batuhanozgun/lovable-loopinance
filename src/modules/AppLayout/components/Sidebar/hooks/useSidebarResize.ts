
import { useEffect, useState } from 'react';
import { useSidebarContext } from '../context/SidebarContext';

export const useSidebarResize = () => {
  const { isExpanded, isMobile } = useSidebarContext();
  const [sidebarWidth, setSidebarWidth] = useState(isExpanded ? '16rem' : '4.5rem');
  
  useEffect(() => {
    if (isMobile) {
      // Mobil görünümde tam genişlik (overlay olarak açılacak)
      setSidebarWidth(isExpanded ? '16rem' : '0');
    } else {
      // Desktop görünümde genişletilmiş veya daraltılmış
      setSidebarWidth(isExpanded ? '16rem' : '4.5rem');
    }
  }, [isExpanded, isMobile]);
  
  return {
    sidebarWidth,
    isExpanded,
    isMobile
  };
};
