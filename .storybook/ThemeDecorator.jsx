
import React from 'react';
import { useEffect, useState } from 'react';

export const ThemeDecorator = (Story, context) => {
  // Tema durumunu tutan state
  const [theme, setTheme] = useState('light');
  
  // Context parametrelerinden temayı okuma
  useEffect(() => {
    const { globals } = context;
    if (globals.theme) {
      setTheme(globals.theme);
      document.documentElement.classList.toggle('dark', globals.theme === 'dark');
    }
  }, [context]);

  return (
    <div className={`${theme} bg-background text-foreground p-4 rounded-md`} style={{ minHeight: '100px' }}>
      <Story />
    </div>
  );
};
