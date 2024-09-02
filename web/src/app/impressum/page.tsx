"use client";

import SectionHeader from "@/components/Common/SectionHeader";
import { motion } from "framer-motion";

const Impressum = () => {
  return (
    <div className="flex justify-center items-center h-screen py-[67rem] xl:py-[47rem] lg:py-[47rem] md:py-[43rem] sm:py-[45rem]">
      <div>
        <SectionHeader
          headerInfo={{
            title: "Impressum".toUpperCase(),
            subtitle: "Informationen gemäß § 5 TMG",
            description: `Ob Fragen, Anregungen oder Kritik – wir freuen uns über Ihre Nachricht und helfen Ihnen gerne weiter.`,
          }}
        />
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -10,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-5 animate_top rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5 max-w-[900px]"
        >
          <div>
            <h1 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
              VERANWORTLICH FÜR DEN INHALT
            </h1>
            <p>
              RiverCore-Technik
              <br />
              Kifferstraße 19
              <br />
              Köln 50667
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Impressum;
