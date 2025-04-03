
/**
 * Sidebar komponentleri için merkezi constants dosyası
 * Tüm transition süreleri, büyüklükler, spacing değerleri burada tanımlanır
 */

// Animasyon ve Geçiş Süreleri
export const TRANSITION = {
  DURATION: 250, // ms - hafifçe azaltıldı daha hızlı geçiş için
  HOVER_DELAY: 100, // ms - azaltıldı daha hızlı tepki için
  TOOLTIP_DELAY: 400, // ms - azaltıldı
  EASING: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out benzeri
} as const;

// Sidebar genişlik değerleri - ekran boyutuna göre
export const SIDEBAR_WIDTHS = {
  EXPANDED: '14rem',   // 224px - daha kompakt
  COLLAPSED: '3.5rem', // 56px - daha kompakt daraltılmış mod
  MOBILE: '16rem',     // 256px - mobil (biraz daha dar)
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
  CONTAINER: 'p-3',   // azaltıldı
  NAV_ITEM: 'px-2 py-1.5', // azaltıldı
  SECTION: 'p-3',     // azaltıldı
  ITEM_GAP: 'gap-1.5', // azaltıldı
  ICON_SIZE: 16,      // küçültüldü
} as const;

// CSS class helper fonksiyonları
export const CSS_CLASSES = {
  // Daraltılmış mod (mobile olmayan durumlarda)
  COLLAPSED: {
    CONTAINER: 'transition-all duration-250 flex',
    CONTENT_VISIBLE: 'opacity-100 visible translate-x-0',
    CONTENT_HIDDEN: 'opacity-0 invisible',
    ICON_ONLY: 'justify-center',
    WITH_TEXT: 'justify-start',
    ICON: 'opacity-100',
    TEXT_VISIBLE: 'opacity-100 visible max-w-full',
    TEXT_HIDDEN: 'opacity-0 invisible max-w-0',
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
