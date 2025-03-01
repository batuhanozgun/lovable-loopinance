
import { useEffect, useState, useMemo } from 'react';
import { useSidebarContext } from '../context/SidebarContext';
import { SIDEBAR_WIDTHS, BREAKPOINTS } from '../constants';

export const useSidebarResize = () => {
  const { isExpanded, isMobile } = useSidebarContext();
  
  // Type hatasını çözmek için açıkça type tanımlıyoruz
  const [sidebarWidth, setSidebarWidth] = useState<typeof SIDEBAR_WIDTHS[keyof typeof SIDEBAR_WIDTHS]>(
    isExpanded ? SIDEBAR_WIDTHS.EXPANDED : SIDEBAR_WIDTHS.COLLAPSED
  );
  
  // Sidebar genişliğini güncelleme etkisi
  useEffect(() => {
    if (isMobile) {
      // Mobil görünümde tam genişlik (overlay olarak açılacak)
      setSidebarWidth(SIDEBAR_WIDTHS.MOBILE);
    } else {
      // Desktop görünümde genişletilmiş veya daraltılmış
      setSidebarWidth(isExpanded ? SIDEBAR_WIDTHS.EXPANDED : SIDEBAR_WIDTHS.COLLAPSED);
    }
  }, [isExpanded, isMobile]);
  
  // Şu anki efektif genişlik (genişletilmiş duruma göre)
  const effectiveWidth = useMemo(() => {
    if (isMobile) {
      return isExpanded ? sidebarWidth : '0';
    }
    
    return sidebarWidth;
  }, [isMobile, isExpanded, sidebarWidth]);
  
  return {
    sidebarWidth,
    effectiveWidth,
    isExpanded,
    isMobile,
    widths: SIDEBAR_WIDTHS
  };
};
