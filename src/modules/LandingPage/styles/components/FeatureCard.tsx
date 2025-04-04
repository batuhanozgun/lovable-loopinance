
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// FeatureCard bileşeni için stil varyantları
export const featureCardVariants = cva(
  "p-4 border border-border/40 bg-background/90 transition-all",
  {
    variants: {
      hover: {
        none: "",
        lift: "hover:-translate-y-0.5 duration-300",
        shadow: "hover:shadow-md hover:border-border/60 duration-300",
        both: "hover:shadow-md hover:border-border/60 hover:-translate-y-0.5 duration-300",
      },
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      hover: "both",
      rounded: "lg",
    },
  }
);

export type FeatureCardVariantsProps = VariantProps<typeof featureCardVariants>;

export const FeatureCard = ({
  className,
  hover,
  rounded,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & FeatureCardVariantsProps) => {
  return (
    <div
      className={cn(featureCardVariants({ hover, rounded }), className)}
      {...props}
    />
  );
};
