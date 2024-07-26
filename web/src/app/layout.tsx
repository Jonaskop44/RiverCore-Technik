import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Lines from "@/components/Lines";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
            <Lines />
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              limit={3}
              stacked
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              transition={Slide}
            />
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
