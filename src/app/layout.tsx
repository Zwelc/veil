"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/appbar";
import { useState } from "react";

import { SearchContext } from "@/context/searchContext";

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
      <body>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Appbar />
          <main className="h-content w-full overflow-y-auto scroll-smooth">
            {children}
          </main>
        </SearchContext.Provider>
      </body>
    </html>
  );
}
