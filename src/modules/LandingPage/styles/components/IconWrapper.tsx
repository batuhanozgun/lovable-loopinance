
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// IconWrapper bileşeni için stil varyantları
export const iconWrapperVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent",
      },
      size: {
        xs: "w-4 h-4",
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
      background: {
        none: "",
        muted: "bg-muted rounded-full p-1",
        primary: "bg-primary/10 dark:bg-primary/5 rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      background: "none",
    },
  }
);

export type IconWrapperVariantsProps = VariantProps<typeof iconWrapperVariants>;

export const IconWrapper = ({
  className,
  variant,
  size,
  background,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & IconWrapperVariantsProps) => {
  return (
    <span
      className={cn(iconWrapperVariants({ variant, size, background }), className)}
      {...props}
    />
  );
};
