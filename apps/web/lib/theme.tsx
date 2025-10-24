'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export default function Providers(
  { children, ...props }: ThemeProviderProps & { children: React.ReactNode }
) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
