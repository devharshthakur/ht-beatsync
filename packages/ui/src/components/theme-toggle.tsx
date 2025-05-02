/**
 * @fileoverview
 * Theme Toggle Component
 *
 * This component provides a theme toggle button that allows users to switch between
 * light and dark themes. It uses next-themes for theme management and includes
 * client-side only rendering to prevent hydration mismatches.
 *
 * @features
 * - Switches between light and dark themes
 * - Handles SSR/CSR hydration correctly
 * - Accessible button with appropriate aria labels
 * - Visual indication of current theme with Sun/Moon icons
 */

'use client';
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './button.js';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export function ThemeToggle(): React.ReactElement {
  /**
   * Tracks whether the component has mounted on the client-side
   * Used to prevent hydration mismatches between server and client rendering
   */
  const [mounted, setMounted] = React.useState<boolean>(false);

  /**
   * Theme information from next-themes
   * - resolvedTheme: The currently active theme (light/dark)
   * - setTheme: Function to change the current theme
   */
  const { resolvedTheme, setTheme } = useTheme();

  /**
   * Set mounted to true after client-side hydration
   * This ensures we only render theme-dependent content on the client
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Handler for theme toggle button click
   * Switches between light and dark themes
   */
  const handleToggleTheme = (): void => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleTheme}
      aria-label={`Toggle theme, current theme is ${mounted ? resolvedTheme : 'unknown'}`}
      className="border-border h-9 w-9 rounded-md"
    >
      {mounted ? (
        resolvedTheme === 'dark' ? (
          <Moon className="h-[1.1rem] w-[1.1rem]" />
        ) : (
          <Sun className="h-[1.1rem] w-[1.1rem]" />
        )
      ) : (
        // Render an empty div during SSR to ensure the same dimensions
        <div className="h-[1.1rem] w-[1.1rem]" />
      )}
    </Button>
  );
}
