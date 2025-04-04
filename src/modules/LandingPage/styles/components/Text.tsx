
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Text bileşeni için stil varyantları
export const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      weight: "normal",
      align: "left",
    },
  }
);

export type TextVariantsProps = VariantProps<typeof textVariants>;

export const Text = ({
  className,
  variant,
  size,
  weight,
  align,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & TextVariantsProps) => {
  return (
    <p
      className={cn(textVariants({ variant, size, weight, align }), className)}
      {...props}
    />
  );
};
