"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Popover, Transition } from "@headlessui/react";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const navigation = [
    { name: "Start", href: "#" },
    { name: "Dienstleistung", href: "#" },
    { name: "Team", href: "#" },
    { name: "Placeholder", href: "#" },
  ];

  return (
    <Popover>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 h-[50px]">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/images/Logo_ELBE-1-749x800.png"
                  alt="Logo Elbe Technik"
                />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 outline-none">
                  <BsList className="h-6 w-6" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="/images/Logo_ELBE-1-749x800.png"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 outline-none">
                  <IoMdClose className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
            >
              Log in
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
