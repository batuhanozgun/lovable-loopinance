
import { cva } from 'class-variance-authority';

// Ana başlık varyantları - tüm başlıklar için kullanılabilir
export const headingVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    emphasis: {
      low: "text-muted-foreground",
      normal: "text-foreground",
      primary: "text-primary",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    spacing: {
      none: "",
      tight: "mb-2",
      normal: "mb-4",
      relaxed: "mb-6",
    },
  },
  defaultVariants: {
    size: "lg",
    weight: "semibold",
    emphasis: "normal",
    align: "left",
    spacing: "normal",
  },
});

// Ana metin varyantları - tüm metinler için kullanılabilir
export const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    emphasis: {
      low: "text-muted-foreground",
      normal: "text-foreground",
      primary: "text-primary",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    spacing: {
      none: "",
      tight: "mb-2",
      normal: "mb-4",
      relaxed: "mb-6",
    },
    fontStyle: {
      normal: "",
      italic: "italic",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    emphasis: "normal",
    align: "left",
    spacing: "normal",
    fontStyle: "normal",
  },
});
