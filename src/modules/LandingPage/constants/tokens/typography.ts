
/**
 * Typography tokens for the landing page components
 */

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
