
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Divider bileşeni için stil varyantları
export const dividerVariants = cva(
  "",
  {
    variants: {
      direction: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
      variant: {
        default: "border-border",
        muted: "border-border/40",
      },
      spacing: {
        sm: "my-2",
        md: "my-4",
        lg: "my-6",
      },
    },
    defaultVariants: {
      direction: "horizontal",
      variant: "default",
      spacing: "md",
    },
  }
);

export type DividerVariantsProps = VariantProps<typeof dividerVariants>;

export const Divider = ({
  className,
  direction,
  variant,
  spacing,
  ...props
}: React.HTMLAttributes<HTMLHRElement> & DividerVariantsProps) => {
  return (
    <hr
      className={cn(dividerVariants({ direction, variant, spacing }), className)}
      {...props}
    />
  );
};
