
import React from 'react';
import { cn } from '@/lib/utils';

export interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: string[];
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
  size?: 'sm' | 'default' | 'lg';
}

export const ColorPicker = ({
  className,
  colors,
  selectedColor,
  onColorSelect,
  size = 'default',
  ...props
}: ColorPickerProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };
  
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            sizeClasses[size],
            "rounded-full cursor-pointer transition-all",
            selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110"
          )}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect?.(color)}
          aria-label={`Renk seç: ${color}`}
        />
      ))}
    </div>
  );
};
