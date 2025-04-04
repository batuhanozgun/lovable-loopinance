
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

type LinkProps = CustomLinkProps | RouterLinkWithCustomProps;

// Type guard fonksiyonu
function isRouterLinkProps(props: LinkProps): props is RouterLinkWithCustomProps {
  return 'to' in props;
}

export const Link: React.FC<LinkProps> = (props) => {
  const { className, variant, size, underline, width, external, ...rest } = props;
  const classes = cn(linkVariants({ variant, size, underline, width }), className);
  
  // RouterLink özelliklerine sahipse (to varsa)
  if (isRouterLinkProps(props)) {
    return (
      <RouterLink
        to={props.to}
        className={classes}
        {...rest}
      />
    );
  }
  
  // Harici link veya normal a etiketi için
  return (
    <a
      className={classes}
      href={(props as CustomLinkProps).href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    />
  );
};
