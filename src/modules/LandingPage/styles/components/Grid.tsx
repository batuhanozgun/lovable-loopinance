
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Grid bileşeni için stil varyantları
export const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
    },
    defaultVariants: {
      cols: 3,
      gap: "md",
    },
  }
);

export type GridVariantsProps = VariantProps<typeof gridVariants>;

export const Grid = ({
  className,
  cols,
  gap,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & GridVariantsProps) => {
  return (
    <div
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  );
};
