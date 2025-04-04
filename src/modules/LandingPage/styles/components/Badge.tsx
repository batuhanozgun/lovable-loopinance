
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Badge bileşeni için stil varyantları
export const badgeVariants = cva(
  "inline-flex items-center text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-primary/30 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        pill: "bg-primary/10 text-primary",
      },
      size: {
        sm: "py-0.5 px-1.5 text-[10px]",
        md: "py-1 px-2.5 text-xs",
        lg: "py-1.5 px-3 text-sm",
      },
      rounded: {
        default: "rounded",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "full",
    },
  }
);

export type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

export const Badge = ({
  className,
  variant,
  size,
  rounded,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & BadgeVariantsProps) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  );
};
