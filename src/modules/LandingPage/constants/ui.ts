
/**
 * LandingPage modülü için UI sabitleri
 * Bu dosya, LandingPage modülünde kullanılan tüm UI bileşenlerinin
 * görünümünü standartlaştırmak için kullanılır.
 */

// Boşluk (Spacing) değerleri - rem biriminde
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

// Tipografi - Font boyutları, ağırlıkları ve satır yükseklikleri
export const typography = {
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: '1.25',
    base: '1.5',
    relaxed: '1.75',
  },
};

// Boyut (Size) değerleri - genişlik ve yükseklik için
export const sizes = {
  icon: {
    xs: '1rem',     // 16px
    sm: '1.25rem',  // 20px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
  },
  button: {
    xs: '1.5rem',   // 24px
    sm: '2rem',     // 32px
    md: '2.5rem',   // 40px
    lg: '3rem',     // 48px
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Kenarlık (Border) değerleri
export const borders = {
  radius: {
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',   // Tam yuvarlak
  },
  width: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
};

// Efekt (Effect) değerleri - gölgeler ve geçişler
export const effects = {
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

// Zemin (Background) değerleri - arka plan stilleri
export const backgrounds = {
  gradient: {
    primary: 'bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)]',
    secondary: 'bg-gradient-to-r from-slate-50/80 via-blue-50/50 to-cyan-50/80 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80',
    hero: 'bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]',
    text: 'bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent',
  },
  pattern: {
    grid: 'bg-grid-pattern bg-muted/50 opacity-30',
    dots: 'bg-dots-pattern bg-muted/30 opacity-20',
  },
  glass: {
    light: 'bg-background/70 backdrop-blur-md',
    medium: 'bg-background/50 backdrop-blur-md',
    strong: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm',
  },
};

// Düzen (Layout) değerleri - padding, margin ve gap için
export const layout = {
  section: {
    padding: {
      x: spacing.md,
      y: spacing.xl,
    },
    margin: {
      top: spacing.xl,
      bottom: spacing.xl,
    },
  },
  card: {
    padding: {
      x: spacing.md,
      y: spacing.md,
    },
    gap: spacing.md,
  },
  header: {
    padding: {
      x: spacing.md,
      y: spacing.sm,
    },
    height: '3.5rem',  // 56px
  },
  footer: {
    padding: {
      x: spacing.md,
      y: spacing.lg,
    },
  },
};

// Z-index değerleri - katmanlar için
export const zIndex = {
  behind: -1,
  default: 0,
  overlay: 10,
  dropdown: 20,
  sticky: 30,
  fixed: 40,
  modal: 50,
  popover: 60,
  toast: 70,
  tooltip: 80,
};

// Kart (Card) stilleri
export const cards = {
  default: {
    padding: layout.card.padding,
    border: `border border-border/40`,
    background: 'bg-background/90',
    hover: 'hover:shadow-md hover:border-border/60 hover:-translate-y-0.5',
    transition: 'transition-all duration-300',
  },
  highlighted: {
    padding: layout.card.padding,
    border: `border-2 border-primary`,
    background: 'bg-background/90',
    hover: 'hover:shadow-lg hover:-translate-y-0.5',
    transition: 'transition-all duration-300',
  },
  feature: {
    padding: `${spacing.md}`,
    border: `border border-border/40`,
    background: 'bg-background/90',
    hover: 'hover:shadow-md hover:border-border/60 hover:-translate-y-0.5',
    transition: 'transition-all duration-300',
  },
};

// Buton (Button) stilleri
export const buttons = {
  primary: {
    background: 'bg-primary',
    text: 'text-primary-foreground',
    hover: 'hover:bg-primary/90',
    size: {
      sm: 'text-xs px-2 py-0.5 h-6',
      md: 'text-sm px-3 py-1 h-8',
      lg: 'text-base px-4 py-2 h-10',
    },
  },
  outline: {
    background: 'bg-background',
    text: 'text-foreground',
    hover: 'hover:bg-muted/50',
    size: {
      sm: 'text-xs px-2 py-0.5 h-6',
      md: 'text-sm px-3 py-1 h-8',
      lg: 'text-base px-4 py-2 h-10',
    },
  },
  ghost: {
    background: 'bg-transparent',
    text: 'text-foreground',
    hover: 'hover:bg-muted/50',
    size: {
      sm: 'text-xs px-2 py-0.5 h-6',
      md: 'text-sm px-3 py-1 h-8',
      lg: 'text-base px-4 py-2 h-10',
    },
  },
};

// Icon stilleri
export const icons = {
  size: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },
  color: {
    primary: 'text-primary',
    muted: 'text-muted-foreground',
    foreground: 'text-foreground',
  },
};

// Metin (Text) stilleri
export const text = {
  heading: {
    h1: 'text-3xl font-bold md:text-4xl',
    h2: 'text-2xl font-bold md:text-3xl',
    h3: 'text-xl font-bold md:text-2xl',
    h4: 'text-lg font-semibold',
    h5: 'text-base font-semibold',
    h6: 'text-sm font-semibold',
  },
  subtitle: {
    sm: 'text-sm text-muted-foreground',
    md: 'text-base text-muted-foreground',
    lg: 'text-lg text-muted-foreground',
  },
  body: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
};

// Bağlantı (Link) stilleri
export const links = {
  default: 'text-foreground hover:text-primary transition-colors',
  primary: 'text-primary hover:text-primary/80 transition-colors',
  muted: 'text-muted-foreground hover:text-foreground transition-colors',
};

// Sayfa yapısı için konteynır genişlikleri
export const containers = {
  default: 'max-w-5xl mx-auto px-4',
  narrow: 'max-w-3xl mx-auto px-4',
  wide: 'max-w-7xl mx-auto px-4',
};

// Rozet (Badge) stilleri
export const badges = {
  default: 'bg-primary/10 text-primary text-xs py-1 px-3 rounded-full',
  outline: 'border border-primary/30 text-primary text-xs py-1 px-3 rounded-full',
  pill: 'bg-primary/10 dark:bg-primary/5 text-xs py-0.5 px-1.5 rounded-full',
};

// Boşluk ve Kenar stilleri
export const dividers = {
  horizontal: 'border-t border-border/40 my-4',
  vertical: 'border-l border-border/40 mx-4 h-full',
};
