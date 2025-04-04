
import React from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { IconWrapper, IconWrapperVariantsProps } from "@/modules/LandingPage/styles/components/IconWrapper";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface IconButtonProps extends Omit<ButtonProps, "size"> {
  children: React.ReactNode;
  iconPosition?: "left" | "right";
  iconSize?: IconWrapperVariantsProps["size"];
  iconVariant?: IconWrapperVariantsProps["variant"];
  className?: string;
}

export const IconButton = ({
  children,
  iconPosition = "right",
  iconSize = "xs",
  iconVariant,
  className,
  variant = "default",
  ...props
}: IconButtonProps) => {
  // Filter out the React children that are icons (Lucide icons)
  const icons = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && typeof child.type !== "string"
  );
  
  // Filter out the text content
  const textContent = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || typeof child.type === "string"
  );

  // Ikon rengi belirleme kuralları:
  // 1. Koyu arka planlı butonlarda (default, gradient, destructive): beyaz ikon kullanılır
  // 2. Açık arka planlı butonlarda (outline, ghost, link): primary (mavi) ikon kullanılır
  let automaticIconVariant: IconWrapperVariantsProps["variant"];
  
  if (variant === "default" || variant === "gradient" || variant === "destructive") {
    automaticIconVariant = "default"; // Beyaz ikon - light modda siyah, dark modda beyaz
  } else {
    automaticIconVariant = "primary"; // Mavi ikon
  }
  
  // Eğer özel bir iconVariant belirtilmişse, onu kullan
  const finalIconVariant = iconVariant || automaticIconVariant;

  return (
    <Button className={cn("group", className)} size="sm" variant={variant} {...props}>
      {iconPosition === "left" && icons.length > 0 && (
        <IconWrapper variant={finalIconVariant} size={iconSize} className="text-white">
          {icons}
        </IconWrapper>
      )}
      
      {textContent}
      
      {iconPosition === "right" && icons.length > 0 && (
        <IconWrapper 
          variant={finalIconVariant} 
          size={iconSize} 
          className={cn(
            "transition-transform group-hover:translate-x-0.5",
            variant === "default" || variant === "gradient" || variant === "destructive" ? "text-white" : ""
          )}
        >
          {icons}
        </IconWrapper>
      )}
    </Button>
  );
};
