"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";

interface SupportLayoutProps {
  children: React.ReactNode;
}

const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Support/Drucker" />
      </div>
    </>
  );
};

export default SupportLayout;
