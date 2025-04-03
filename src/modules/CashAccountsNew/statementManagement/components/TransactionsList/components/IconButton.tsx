
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from '@/components/ui/tooltip';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  size?: 'icon' | 'sm' | 'xs';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'ghost',
  disabled = false,
  size = 'icon'
}) => {
  // Button'un size prop'unu yönetme
  const buttonSize = size === 'xs' ? undefined : size === 'sm' ? 'sm' : 'icon';
  
  // Custom class name oluşturma
  const sizeClassName = size === 'xs' 
    ? "h-5 w-5 p-0" 
    : size === 'sm' 
      ? "h-6 w-6 p-0" 
      : "h-7 w-7 p-0";

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={buttonSize}
            onClick={onClick}
            disabled={disabled}
            className={sizeClassName}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs py-1 px-2">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
