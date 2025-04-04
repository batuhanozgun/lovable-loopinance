
/**
 * Component tokens for the landing page components
 */

// Kart (Card) stilleri
export const cards = {
  default: {
    padding: { x: '1rem', y: '1rem' },
    border: `border border-border/40`,
    background: 'bg-background/90',
    hover: 'hover:shadow-md hover:border-border/60 hover:-translate-y-0.5',
    transition: 'transition-all duration-300',
  },
  highlighted: {
    padding: { x: '1rem', y: '1rem' },
    border: `border-2 border-primary`,
    background: 'bg-background/90',
    hover: 'hover:shadow-lg hover:-translate-y-0.5',
    transition: 'transition-all duration-300',
  },
  feature: {
    padding: `1rem`,
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

// Bağlantı (Link) stilleri
export const links = {
  default: 'text-foreground hover:text-primary transition-colors',
  primary: 'text-primary hover:text-primary/80 transition-colors',
  muted: 'text-muted-foreground hover:text-foreground transition-colors',
};

// Rozet (Badge) stilleri
export const badges = {
  default: 'bg-primary/10 text-primary text-xs py-1 px-3 rounded-full',
  outline: 'border border-primary/30 text-primary text-xs py-1 px-3 rounded-full',
  pill: 'bg-primary/10 dark:bg-primary/5 text-xs py-0.5 px-1.5 rounded-full',
};
