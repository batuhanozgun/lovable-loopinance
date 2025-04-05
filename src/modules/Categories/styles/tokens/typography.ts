
import { cva } from 'class-variance-authority';

// Kategori başlıkları için stil varyantları
export const categoryTitleVariants = cva("font-medium", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    transform: {
      normal: "",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "medium",
    transform: "normal",
  },
});

// Alt kategori metinleri için stil varyantları
export const subcategoryTextVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-sm",
      lg: "text-base",
    },
    emphasis: {
      low: "text-muted-foreground",
      normal: "text-foreground",
      high: "text-primary",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "default",
    emphasis: "normal",
    weight: "normal",
  },
});

// Sayfa başlıkları için stil varyantları
export const pageHeadingVariants = cva("", {
  variants: {
    level: {
      h1: "text-2xl md:text-3xl lg:text-4xl",
      h2: "text-xl md:text-2xl lg:text-3xl",
      h3: "text-lg md:text-xl lg:text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    spacing: {
      none: "",
      tight: "mb-2",
      normal: "mb-4",
      relaxed: "mb-6",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    emphasis: {
      normal: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
    }
  },
  defaultVariants: {
    level: "h2",
    weight: "semibold",
    spacing: "normal",
    align: "left",
    emphasis: "normal",
  },
});
