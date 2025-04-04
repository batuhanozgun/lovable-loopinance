
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

// Link bileşeni için stil varyantları
export const linkVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        primary: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
        inherit: "text-inherit",
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
      width: {
        auto: "",
        full: "w-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: "none",
      width: "auto",
    },
  }
);

export type LinkVariantsProps = VariantProps<typeof linkVariants>;

export interface CustomLinkProps 
  extends React.HTMLAttributes<HTMLAnchorElement>, 
  LinkVariantsProps {
  href?: string;
  external?: boolean;
}

export interface RouterLinkWithCustomProps extends RouterLinkProps, LinkVariantsProps {
  external?: boolean;
}

export const Link: React.FC<CustomLinkProps | RouterLinkWithCustomProps> = ({
  className,
  variant,
  size,
  underline,
  width,
  href,
  to,
  external,
  ...props
}) => {
  const classes = cn(linkVariants({ variant, size, underline, width }), className);
  
  // Eğer harici bir link ise veya sadece href verilmişse
  if (external || (href && !to)) {
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  }
  
  // Uygulama içi link (react-router-dom)
  return (
    <RouterLink
      to={to || href || "/"}
      className={classes}
      {...props}
    />
  );
};
