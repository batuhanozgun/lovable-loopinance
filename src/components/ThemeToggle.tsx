
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps extends Omit<ButtonProps, "onClick"> {
  className?: string;
}

export const ThemeToggle = ({ className, ...props }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation(['common']);
  
  // Initialize theme based on stored preference or system preference
  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // If no stored preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn("h-8 w-8 rounded-full hover:bg-muted/60", className)}
            aria-label={isDarkMode ? t('common:lightMode') : t('common:darkMode')}
            {...props}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDarkMode ? t('common:lightMode') : t('common:darkMode')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
