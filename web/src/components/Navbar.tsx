"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const links = [
    { name: "Start", page: "start" },
    { name: "Dienstleistung", page: "1" },
    { name: "Team", page: "2" },
    { name: "Place", page: "3" },
    { name: "holder", page: "4" },
  ];

  return (
    <header className="absolute z-50 flex h-20 w-full items-center justify-between px-6 text-white lg:px-[5%] xl:px-[10%]">
      <Link href="/" className="flex h-3/5 items-center justify-between gap-4">
        <img
          src="/images/Logo_ELBE-1-749x800.png"
          alt="RentYourBeat Logo"
          className="h-3/4 xl:h-full"
        />
        <h1 className="text-2xl font-bold xl:text-4xl">Elbe - Technik</h1>
      </Link>
      <nav>
        <ul className="hidden space-x-4 lg:flex">
          {links.map((link) => (
            <li key={link.page}>
              <Link
                href={`/${link.page}`}
                className={`delay font-normal transition-colors duration-150 ease-in-out hover:text-gray-300 `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {sidebar && (
          <div className="fixed right-0 top-0 z-50 flex h-lvh w-full flex-col items-start justify-start bg-black bg-opacity-20 pt-20 backdrop-blur md:w-60 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.page}
                href={`/${link.page}`}
                onClick={() => setSidebar(false)}
                className="w-full pb-1.5 pl-5 pt-1.5 text-xl font-semibold transition-colors duration-150 ease-in-out hover:bg-black hover:bg-opacity-10 hover:text-gray-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
      {sidebar ? (
        <IoMdClose
          size="32px"
          className="right-6 transition-colors duration-150 ease-in-out lg:!hidden fixed z-50"
          onClick={() => setSidebar(false)}
        />
      ) : (
        <BsList
          size="32px"
          className="right-6 transition-colors duration-150 ease-in-out lg:!hidden"
          onClick={() => setSidebar(true)}
        />
      )}
    </header>
  );
};

export default Navbar;
