
import { useEffect, useState, useMemo } from 'react';
import { useSidebarContext } from '../context/SidebarContext';

// Sidebara ait genişlik değerleri - ekran boyutuna göre
export const SIDEBAR_WIDTHS = {
  EXPANDED: '16rem',   // 256px - tam genişlik
  COLLAPSED: '4.5rem', // 72px - daraltılmış
  MOBILE: '18rem',     // 288px - mobil (biraz daha geniş)
} as const;

// Responsive breakpoint değerleri
export const BREAKPOINTS = {
  MOBILE: 640,  // sm
  TABLET: 768,  // md
  DESKTOP: 1024, // lg
} as const;

export const useSidebarResize = () => {
  const { isExpanded, isMobile, isHovering } = useSidebarContext();
  
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

  // Hover durumunda gerçekleşen sidebar genişliği - useMemo ile optimize
  const getHoverWidth = useMemo(() => {
    if (!isMobile && !isExpanded && isHovering) {
      return SIDEBAR_WIDTHS.EXPANDED;
    }
    return sidebarWidth;
  }, [isMobile, isExpanded, isHovering, sidebarWidth]);
  
  // Şu anki efektif genişlik (hover veya genişletilmiş duruma göre)
  const effectiveWidth = useMemo(() => {
    if (isMobile) {
      return isExpanded ? sidebarWidth : '0';
    }
    
    return isHovering && !isExpanded ? SIDEBAR_WIDTHS.EXPANDED : sidebarWidth;
  }, [isMobile, isExpanded, isHovering, sidebarWidth]);
  
  return {
    sidebarWidth,
    effectiveWidth,
    isExpanded,
    isMobile,
    widths: SIDEBAR_WIDTHS,
    getHoverWidth
  };
};
