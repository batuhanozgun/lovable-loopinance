
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Link bileşeni için stil varyantları
export const linkVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        primary: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      underline: {
        none: "",
        hover: "hover:underline",
        always: "underline",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: "none",
    },
  }
);

export type LinkVariantsProps = VariantProps<typeof linkVariants>;

export const Link = ({
  className,
  variant,
  size,
  underline,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & LinkVariantsProps) => {
  return (
    <a
      className={cn(linkVariants({ variant, size, underline }), className)}
      {...props}
    />
  );
};
