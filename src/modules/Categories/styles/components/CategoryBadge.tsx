
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Kategori rozeti için stil varyantları
export const categoryBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        outline: "border border-primary/50 text-primary",
        secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
        muted: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        default: "text-xs px-3 py-1",
        lg: "text-sm px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CategoryBadgeProps extends 
  React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof categoryBadgeVariants> {
  children: React.ReactNode;
  color?: string;
}

export const CategoryBadge = ({
  className,
  variant,
  size,
  children,
  color,
  style,
  ...props
}: CategoryBadgeProps) => {
  return (
    <span
      className={cn(categoryBadgeVariants({ variant, size }), className)}
      style={{ 
        ...(color && { backgroundColor: `${color}20`, color }),
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
};
