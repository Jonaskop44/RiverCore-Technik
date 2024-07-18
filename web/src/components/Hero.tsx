"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <section
        className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46"
        id="home"
      >
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Elbe - Technik
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Innovationen nutzen{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-sky-500/50 dark:before:bg-sky-500/50">
                  erfolgreich umsetzen
                </span>
              </h1>
              <div className="animate_right md:w-1/2 md:hidden">
                <div className="relative 2xl:-mr-7.5">
                  <div className="relative aspect-[700/444] max-w-[600px]">
                    <Image
                      className="shadow-solid-l dark:hidden"
                      draggable={false}
                      src="/images/blog/blog-big.png"
                      alt="Hero"
                      fill
                    />
                    <Image
                      className="hidden shadow-solid-l dark:block"
                      src="/images/blog/blog-big.png"
                      draggable={false}
                      alt="Hero"
                      fill
                    />
                  </div>
                </div>
              </div>
              <p>
                Bei <b>Elbe - Technik</b> bieten wir maßgeschneiderte
                Techniklösungen für Ihr Unternehmen. Kontaktieren Sie uns per
                Telefon oder E-Mail und profitieren Sie von unserer umfassenden
                Beratung und Unterstützung. Setzen Sie Ihre Projekte mit
                modernster Technik erfolgreich um!
              </p>

              <div className="mt-10">
                <div className="flex flex-wrap gap-5">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Ihre E-Mail-Adresse"
                    className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                  />
                  <Input placeholder="Ihre E-Mail-Adresse" />
                  <button
                    aria-label="get started button"
                    className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  >
                    Abonnieren
                  </button>
                  <Button
                    aria-label="get started button"
                    className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  >
                    Abonnieren
                  </Button>
                </div>

                <p className="mt-5 text-black dark:text-white">
                  Erhalten Sie die neuesten Updates und Angebote direkt in Ihrem
                  Posteingang
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 md:block">
              <div className="relative 2xl:-mr-7.5">
                <div className="relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    draggable={false}
                    src="/images/blog/blog-big.png"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/blog/blog-big.png"
                    draggable={false}
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
