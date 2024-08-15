import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import sidebarData, { MenuItem, SidebarGroup } from "./sidebarData";
import { useUserStore } from "@/data/userStore";
import { motion } from "framer-motion";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useState<string>("dashboard");
  const { user } = useUserStore();

  const filteredSidebarData: SidebarGroup[] = sidebarData
    .map((group: SidebarGroup) => ({
      ...group,
      menuItems: group.menuItems.filter(
        (item: MenuItem) => !item.roles || item.roles.includes(user?.role)
      ),
    }))
    .filter((group) => group.menuItems.length > 0);

  return (
    <div className="relative">
      {/* Overlay, das erscheint, wenn die Sidebar geöffnet ist */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-strokedark dark:bg-blacksection lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-between gap-2 px-6 pb-5.5 lg:pb-6.5 xl:pb-10"
        >
          <Link href="/">
            <Image
              width={60}
              height={30}
              src={"/images/logo/ELBE_Technik_Logo-mitSchatten.png"}
              alt="Logo"
              draggable={false}
              priority
              className="dark:hidden"
              style={{ width: "auto", height: "auto" }}
            />
            <Image
              width={60}
              height={30}
              draggable={false}
              src={"/images/logo/ELBE_Technik_Logo-mitSchatten.png"}
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
            Dashboard
          </h1>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </motion.div>
        {/* SIDEBAR HEADER */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-1 px-4 lg:px-6">
            {filteredSidebarData.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* Sidebar Menu */}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
