import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        console.log("Toggling theme from", theme);
        setTheme(theme === 'light' ? 'dark' : 'light')}}
      className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale group"
    >
      <div className="relative w-5 h-5">
        <Sun className="w-5 h-5 text-muted-foreground rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 group-hover:text-primary" />
        <Moon className="absolute top-0 left-0 w-5 h-5 text-muted-foreground rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 group-hover:text-primary" />
      </div>
    </button>
  );
};

