
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { IconWrapper, IconWrapperVariantsProps } from "@/modules/LandingPage/styles/components/IconWrapper";
import { cn } from "@/lib/utils";

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
  iconVariant = "primary",
  className,
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

  return (
    <Button className={cn("group", className)} size="sm" {...props}>
      {iconPosition === "left" && icons.length > 0 && (
        <IconWrapper variant={iconVariant} size={iconSize}>
          {icons}
        </IconWrapper>
      )}
      
      {textContent}
      
      {iconPosition === "right" && icons.length > 0 && (
        <IconWrapper 
          variant={iconVariant} 
          size={iconSize} 
          className="transition-transform group-hover:translate-x-0.5"
        >
          {icons}
        </IconWrapper>
      )}
    </Button>
  );
};
