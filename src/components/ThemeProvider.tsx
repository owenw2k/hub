"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactElement } from "react";

import type { ThemeProviderProps } from "next-themes";

/**
 * Wraps next-themes ThemeProvider with class-based dark mode.
 *
 * @param props - Forwarded to next-themes ThemeProvider.
 */
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps): ReactElement => (
  <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
    {children}
  </NextThemesProvider>
);
