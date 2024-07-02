import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import LayoutQueryClientProvider from "@/components/query-client-provider";
import DefaultLayout from "@/components/default-layout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Test Pokemon Chom chob",
  description: "Test Pokemon Chom chob",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LayoutQueryClientProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </LayoutQueryClientProvider>
      </body>
    </html>
  );
}
