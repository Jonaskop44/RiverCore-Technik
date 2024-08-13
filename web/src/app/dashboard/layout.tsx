"use client";

import { useState } from "react";
import Header from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import SessionProvider from "@/context/SessionProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#f3f4f6] dark:bg-dark">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="bg-[#f3f4f6] dark:bg-dark h-screen">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <SessionProvider>{children}</SessionProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
