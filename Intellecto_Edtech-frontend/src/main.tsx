import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider 
    defaultTheme="dark" 
    storageKey="intellecto-theme"
    enableSystem={false} // Disable system theme detection
    forcedTheme={undefined} // Remove any forced theme
  >
    <App />
  </ThemeProvider>
);