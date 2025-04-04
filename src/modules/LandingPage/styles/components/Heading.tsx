
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Heading bileşeni için stil varyantları
export const headingVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent",
      },
      level: {
        h1: "text-3xl md:text-4xl font-bold",
        h2: "text-2xl md:text-3xl font-bold",
        h3: "text-xl md:text-2xl font-bold",
        h4: "text-lg font-semibold",
        h5: "text-base font-semibold",
        h6: "text-sm font-semibold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      level: "h2",
      align: "left",
    },
  }
);

export type HeadingVariantsProps = VariantProps<typeof headingVariants>;

export const Heading = ({
  className,
  variant,
  level = "h2",
  align,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & HeadingVariantsProps & {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return React.createElement(
    level,
    {
      className: cn(headingVariants({ variant, level, align }), className),
      ...props
    },
    props.children
  );
};
