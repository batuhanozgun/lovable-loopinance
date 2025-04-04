
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Divider bileşeni için stil varyantları
export const dividerVariants = cva(
  "shrink-0",
  {
    variants: {
      variant: {
        default: "border-border",
        muted: "border-border/50",
        primary: "border-primary/60",
      },
      direction: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
    },
    defaultVariants: {
      variant: "default",
      direction: "horizontal",
    },
  }
);

export type DividerVariantsProps = VariantProps<typeof dividerVariants>;

export const Divider = ({
  className,
  variant,
  direction,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & DividerVariantsProps) => {
  return (
    <div
      className={cn(dividerVariants({ variant, direction }), className)}
      {...props}
    />
  );
};
