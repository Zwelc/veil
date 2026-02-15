"use client";

import "./globals.css";
import Appbar from "@/components/layout/appbar";
import { Inter as FontSans } from "next/font/google";
import { SearchProvider } from "@/context/searchContext";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Veil</title>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <SearchProvider>
              <main className="relative flex min-h-screen flex-col bg-background">
                <Appbar />
                {children}
                <Analytics />
              </main>
            </SearchProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
