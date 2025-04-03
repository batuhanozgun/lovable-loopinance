
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'ghost',
  disabled = false
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant={variant} 
          size="icon" 
          onClick={onClick}
          disabled={disabled}
          className="h-8 w-8"
        >
          {icon}
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};
