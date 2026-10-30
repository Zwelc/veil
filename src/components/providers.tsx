"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SearchProvider } from "@/context/searchContext";
import { ThemeProvider } from "@/components/layout/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <SearchProvider>{children}</SearchProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
