
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Container bileşeni için stil varyantları
export const containerVariants = cva(
  "mx-auto px-4",
  {
    variants: {
      size: {
        narrow: "max-w-3xl",
        default: "max-w-5xl",
        wide: "max-w-7xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof containerVariants> & {
    children: React.ReactNode;
  };

export const Container = ({
  className,
  size,
  children,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
