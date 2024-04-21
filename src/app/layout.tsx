"use client";

import "./globals.css";
import Appbar from "@/components/layout/appbar";
import { useState } from "react";
import { Inter as FontSans } from "next/font/google";
import { SearchContext } from "@/context/searchContext";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [search, setSearch] = useState("");
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
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchContext.Provider value={{ search, setSearch }}>
            <main className="relative flex min-h-screen flex-col bg-background">
              <Appbar />
              {children}
              <Analytics />
            </main>
          </SearchContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
