import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Lines from "@/components/Lines";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import ClientWrapper from "@/context/ClientWrapper";
import SessionProvider from "@/context/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elbe Tehcknik",
  description:
    "Elbe Tehcknik is a software development company based in Austria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <NextUIProvider>
            <NextTopLoader />
            <SessionProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </SessionProvider>
            <Toaster position="bottom-right" richColors />
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
