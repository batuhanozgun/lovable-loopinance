
/**
 * Sidebar komponentleri için merkezi constants dosyası
 * Tüm transition süreleri, büyüklükler, spacing değerleri burada tanımlanır
 */

// Animasyon ve Geçiş Süreleri
export const TRANSITION = {
  DURATION: 300, // ms
  HOVER_DELAY: 100, // ms
  TOOLTIP_DELAY: 300, // ms
  EASING: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out benzeri
} as const;

// Sidebar genişlik değerleri - ekran boyutuna göre
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

// Z-index değerleri
export const Z_INDEX = {
  SIDEBAR: 50,
  SIDEBAR_MOBILE: 50,
  BACKDROP: 40,
  TOOLTIP: 100,
} as const;

// Spacing ve padding değerleri
export const SPACING = {
  CONTAINER: 'p-4',
  NAV_ITEM: 'px-3 py-2',
  SECTION: 'p-4',
  ITEM_GAP: 'gap-2',
  ICON_SIZE: 18,
} as const;

// CSS class helper fonksiyonları
export const CSS_CLASSES = {
  // Daraltılmış mod (mobile olmayan durumlarda)
  COLLAPSED: {
    CONTAINER: 'transition-all duration-300 flex',
    CONTENT_VISIBLE: 'opacity-100 visible translate-x-0',
    CONTENT_HIDDEN: 'opacity-0 invisible -translate-x-2',
    ICON_ONLY: 'justify-center',
    WITH_TEXT: 'justify-start',
  },
  // Sidebar background, border ve text renkleri
  COLORS: {
    BG: 'bg-sidebar',
    TEXT: 'text-sidebar-foreground',
    BORDER: 'border-sidebar-border',
    ACCENT: 'bg-sidebar-accent',
    ACCENT_HOVER: 'hover:bg-sidebar-accent',
    PRIMARY: 'text-sidebar-primary',
  },
  // Animasyon ve transition class'ları
  TRANSITIONS: {
    BASE: `transition-all duration-${TRANSITION.DURATION}`,
    OPACITY: 'transition-opacity',
    TRANSFORM: 'transition-transform',
    ALL: 'transition-all',
  },
} as const;
