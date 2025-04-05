
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Alt kategori kartı için stil varyantları
export const subcategoryCardVariants = cva(
  "relative rounded border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        selected: "bg-accent/20 border-accent",
        nested: "ml-4 bg-background/70",
      },
      size: {
        sm: "p-2",
        default: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SubcategoryCardProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof subcategoryCardVariants> {
  children: React.ReactNode;
}

export const SubcategoryCard = ({
  className,
  variant,
  size,
  children,
  ...props
}: SubcategoryCardProps) => {
  return (
    <div
      className={cn(subcategoryCardVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
