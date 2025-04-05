
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
