"use client";

import { usePathname } from "next/navigation";
import Lines from "@/components/Lines";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  return (
    <>
      {!isDashboardPage && <Lines />}
      {!isDashboardPage && <Navbar />}
      {children}
      {!isDashboardPage && <Footer />}
      {!isDashboardPage && <ScrollToTop />}
    </>
  );
}
