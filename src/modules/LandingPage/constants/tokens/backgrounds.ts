
/**
 * Background tokens for the landing page components
 */

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
