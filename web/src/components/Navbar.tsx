/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navigation = [
  {
    name: "home",
    href: "#",
  },
  {
    name: "services",
    href: "#",
  },
  {
    name: "about",
    href: "#",
  },
  {
    name: "contact",
    href: "#",
  },
];

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2,
      },
    },
    closed: { opacity: 0 },
  };

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="text-[#f5f5dc] overflow-y-hidden">
      <div
        className={`content-wrapper ${mobileNavOpen ? "blur-sm" : ""}`}
      ></div>
      <motion.nav
        initial="closed"
        animate={mobileNavOpen ? "opened" : "closed"}
        className="flex justify-between p-[35px]"
      >
        <div className="overflow-y-hidden">
          <motion.h1 variants={hideNavItemsVariant}>
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="h-8 w-auto sm:h-10"
            />
          </motion.h1>
        </div>

        <div className="overflow-y-hidden">
          <motion.div
            variants={hideNavItemsVariant}
            onClick={() => setMobileNavOpen(true)}
            className="uppercase text-[13px] hover:cursor-pointer text-black"
          >
            Menu
          </motion.div>
        </div>
        <motion.div
          variants={mobileMenuVariant}
          className="mobile-menu fixed top-0 left-0 h-screen w-full flex flex-col items-center bg-black/70 "
        >
          <motion.button
            variants={fadeInVariant}
            onClick={() => setMobileNavOpen(false)}
            className="self-end mr-[45px] mt-[35px] outline-none border-none bg-transparent uppercase text-sm text-white hover:cursor-pointer"
          >
            Close
          </motion.button>
          <motion.ul variants={ulVariant} className="list-none mt-[40px]">
            {navigation.map((item) => (
              <motion.li
                whileTap={{ scale: 0.95 }}
                key={item.name}
                className="my-5 mx-0 overflow-y-hidden select-none"
              >
                <motion.div
                  variants={liVariant}
                  className="text-center capitalize text-[34px] hover:cursor-pointer "
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeInVariant} className="flex mt-[80px] ">
            <h5 className="font-normal mr-[40px]">+852 5650 2233</h5>
            <h5 className="font-normal">hi@designagency.com</h5>
          </motion.div>
        </motion.div>
      </motion.nav>
    </main>
  );
};

export default App;
