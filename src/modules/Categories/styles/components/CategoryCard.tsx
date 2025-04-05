
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Kategori kartı için stil varyantları
export const categoryCardVariants = cva(
  "relative rounded-lg border overflow-hidden transition-all",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        selected: "bg-primary/5 border-primary/30",
        interactive: "hover:border-primary/50 cursor-pointer",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CategoryCardProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof categoryCardVariants> {
  children: React.ReactNode;
}

export const CategoryCard = ({
  className,
  variant,
  size,
  children,
  ...props
}: CategoryCardProps) => {
  return (
    <div
      className={cn(categoryCardVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
