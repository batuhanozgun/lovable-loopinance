
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
  // Filter out the React children that are not icons (Lucide icons)
  const icons = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && typeof child.type !== "string"
  );
  
  // Filter out the text content
  const textContent = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || typeof child.type === "string"
  );

  // Basit tasarım kuralına göre ikon rengini belirleme:
  // - Mavi/Primary/Gradient butonlar = beyaz ikon
  // - Beyaz/Default arka plan = mavi ikon
  let automaticIconVariant: IconWrapperVariantsProps["variant"];
  
  if (variant === "primary" || variant === "gradient") {
    automaticIconVariant = "default"; // Beyaz ikon
  } else {
    automaticIconVariant = "primary"; // Mavi ikon
  }
  
  // Eğer özel bir iconVariant belirtilmişse, onu kullan
  const finalIconVariant = iconVariant || automaticIconVariant;

  return (
    <Button className={cn("group", className)} size="sm" variant={variant} {...props}>
      {iconPosition === "left" && icons.length > 0 && (
        <IconWrapper variant={finalIconVariant} size={iconSize}>
          {icons}
        </IconWrapper>
      )}
      
      {textContent}
      
      {iconPosition === "right" && icons.length > 0 && (
        <IconWrapper 
          variant={finalIconVariant} 
          size={iconSize} 
          className="transition-transform group-hover:translate-x-0.5"
        >
          {icons}
        </IconWrapper>
      )}
    </Button>
  );
};
