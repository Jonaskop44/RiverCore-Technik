import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import ClientWrapper from "@/context/ClientWrapper";
import SessionProvider from "@/context/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiverCore-Technik",
  description:
    "RiverCore-Technik is a platform for developers and designers to showcase their work and learn from one another.",
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
