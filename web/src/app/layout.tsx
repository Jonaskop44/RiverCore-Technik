import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Lines from "@/components/Lines";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

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
          <Lines />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
