import "./globals.css";
import Appbar from "@/components/layout/appbar";
import SiteFooter from "@/components/layout/site-footer";
import { Providers } from "@/components/providers";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veil",
  description: "Dota 2 player statistics and match insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSans.className} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col bg-background">
            <Appbar />
            {children}
            <SiteFooter />
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
