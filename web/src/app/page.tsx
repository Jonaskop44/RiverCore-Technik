/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment } from "react";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import ParallaxText from "@/components/ParallaxText";
import BusinessAreaCard from "@/components/BusinessAreaCard";
import Navbar from "@/components/Navbar";

const Home = () => {
  const texth1span1 = "Innovationen nutzen".split("");
  const texth1span2 = "erfolgreich umsetzen".split("");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const getFormattedParagraph = () => {
    const paragraphText =
      "Bei Elbe - Technik bieten wir maßgeschneiderte Techniklösungen für Ihr Unternehmen. Kontaktieren Sie uns per Telefon oder E-Mail und profitieren Sie von unserer umfassenden Beratung und Unterstützung. Setzen Sie Ihre Projekte mit modernster Technik erfolgreich um!";
    const parts = paragraphText.split(/(Elbe - Technik)/);
    return parts.map((part, index) => (
      <Fragment key={index}>
        {part === "Elbe - Technik" ? (
          <strong>
            {part.split("").map((char, i) => (
              <motion.span
                key={i}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </strong>
        ) : (
          part.split("").map((char, i) => (
            <motion.span
              key={i}
              transition={{ duration: 0.5 }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))
        )}
      </Fragment>
    ));
  };

  return (
    <div>
      {/*Hero*/}
      <main className="relative bg-white overflow-hidden lg:h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-screen w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Navbar />

            <section className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 lg:h-screen">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Innovationen nutzen</span>{" "}
                  <span className="block text-blue-600 xl:inline">
                    erfolgreich umsetzen
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Bei <b>Elbe - Technik</b> bieten wir maßgeschneiderte
                  Techniklösungen für Ihr Unternehmen. Kontaktieren Sie uns per
                  Telefon oder E-Mail und profitieren Sie von unserer
                  umfassenden Beratung und Unterstützung. Setzen Sie Ihre
                  Projekte mit modernster Technik erfolgreich um!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    >
                      <Button className="w-full flex items-center justify-center px-8 py-6 text-base font-medium rounded-md text-white bg-sky-600 md:py-8 md:text-lg md:px-10 -z-10">
                        Mehr Erfahren
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 w-full lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </main>

      {/*Company*/}
      <section className="lg:pt-[12vh] lg:pb-[12vh] relative">
        <ParallaxText baseVelocity={-5}>
          <div className="flex">
            <span className="block mr-[30px] grayscale">
              <img src="/images/partner/sharp.png" alt="Sharp" />
            </span>
            <span className="block mr-[30px] grayscale">
              <img src="/images/partner/brother.png" alt="Brother" />
            </span>
          </div>
        </ParallaxText>
        <ParallaxText baseVelocity={5}>
          <div className="flex">
            <span className="block mr-[30px] grayscale">
              <img src="/images/partner/brother.png" alt="Brother" />
            </span>
            <span className="block mr-[30px] grayscale">
              <img src="/images/partner/sharp.png" alt="Sharp" />
            </span>
          </div>
        </ParallaxText>
      </section>

      {/*Business Areas*/}
      <BusinessAreaCard />
    </div>
  );
};

export default Home;
