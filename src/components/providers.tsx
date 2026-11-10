"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { makeQueryClient } from "@/lib/query-client";
import { useState } from "react";
import { SearchProvider } from "@/context/searchContext";
import { ThemeProvider } from "@/components/layout/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {/* Respect the OS "reduce motion" setting for every framer-motion animation. */}
        <MotionConfig reducedMotion="user">
          {/* Load only the DOM animation features (smaller bundle). `strict` throws if a
              full `motion.*` component is used: use `m.*` everywhere. */}
          <LazyMotion features={domAnimation} strict>
            <SearchProvider>{children}</SearchProvider>
          </LazyMotion>
        </MotionConfig>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
