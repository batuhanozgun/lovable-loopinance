
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Container bileşeni için stil varyantları
export const containerVariants = cva(
  "mx-auto relative z-10",
  {
    variants: {
      size: {
        default: "max-w-5xl",
        narrow: "max-w-3xl",
        wide: "max-w-7xl",
        full: "w-full",
      },
      padding: {
        none: "",
        xs: "px-2",
        sm: "px-3",
        md: "px-4",
        lg: "px-6",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "md",
    },
  }
);

export type ContainerVariantsProps = VariantProps<typeof containerVariants>;

export const Container = ({
  className,
  size,
  padding,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & ContainerVariantsProps) => {
  return (
    <div
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  );
};
