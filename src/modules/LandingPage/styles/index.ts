
/**
 * LandingPage modülü için stil tanımlamaları
 * Bu dosya, LandingPage modülünde kullanılan bileşenlerin 
 * stil varyantlarını tanımlar.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Section bileşeni için stil varyantları
export const sectionVariants = cva(
  "w-full relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "py-10 px-4",
        hero: "py-12 px-4 md:py-20",
        feature: "py-12 px-4",
        cta: "py-10 px-4 relative overflow-hidden",
        pricing: "py-12 px-4",
      },
      background: {
        none: "",
        muted: "bg-muted/30",
        gradient: "bg-gradient-to-r from-slate-50/80 via-blue-50/50 to-cyan-50/80 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80",
        hero: "bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]",
        pattern: "relative before:absolute before:inset-0 before:bg-grid-pattern before:bg-muted/50 before:opacity-30 before:-z-10",
      },
    },
    defaultVariants: {
      variant: "default",
      background: "none",
    },
  }
);

export type SectionVariantsProps = VariantProps<typeof sectionVariants>;

export const Section = ({
  className,
  variant,
  background,
  ...props
}: React.HTMLAttributes<HTMLElement> & SectionVariantsProps) => {
  return (
    <section
      className={cn(sectionVariants({ variant, background }), className)}
      {...props}
    />
  );
};

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

// Text bileşeni için stil varyantları
export const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] bg-clip-text text-transparent",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      weight: "normal",
      align: "left",
    },
  }
);

export type TextVariantsProps = VariantProps<typeof textVariants>;

export const Text = ({
  className,
  variant,
  size,
  weight,
  align,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & TextVariantsProps) => {
  return (
    <p
      className={cn(textVariants({ variant, size, weight, align }), className)}
      {...props}
    />
  );
};

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

// Badge bileşeni için stil varyantları
export const badgeVariants = cva(
  "inline-flex items-center text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-primary/30 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        pill: "bg-primary/10 text-primary",
      },
      size: {
        sm: "py-0.5 px-1.5 text-[10px]",
        md: "py-1 px-2.5 text-xs",
        lg: "py-1.5 px-3 text-sm",
      },
      rounded: {
        default: "rounded",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "full",
    },
  }
);

export type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

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

// Link bileşeni için stil varyantları
export const linkVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        primary: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      underline: {
        none: "",
        hover: "hover:underline",
        always: "underline",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: "none",
    },
  }
);

export type LinkVariantsProps = VariantProps<typeof linkVariants>;

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

// Grid bileşeni için stil varyantları
export const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      },
      gap: {
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
    },
    defaultVariants: {
      cols: 1,
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
