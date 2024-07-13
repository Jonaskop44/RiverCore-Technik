"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Team = () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.".split(
      ""
    );

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <div>
      <Navbar />
      <motion.h1
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.02 }}
      >
        {text.map((char) => (
          <motion.span
            key={char}
            transition={{ duration: 0.5 }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Team;
