"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    phone: false,
    message: false,
  });

  const isInvalidEmail = useMemo(() => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }, [email]);

  const isInvalidName = useMemo(() => {
    return name.trim() === "";
  }, [name]);

  const isInvalidSubject = useMemo(() => {
    return subject.trim() === "";
  }, [subject]);

  const isInvalidPhone = useMemo(() => {
    return !/^\+?[0-9]{7,15}$/.test(phone);
  }, [phone]);

  const isInvalidMessage = useMemo(() => {
    return message.trim() === "";
  }, [message]);

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const isFormValid = useMemo(() => {
    return (
      !isInvalidEmail &&
      !isInvalidName &&
      !isInvalidSubject &&
      !isInvalidPhone &&
      !isInvalidMessage &&
      isAgreed
    );
  }, [
    isInvalidEmail,
    isInvalidName,
    isInvalidSubject,
    isInvalidPhone,
    isInvalidMessage,
    isAgreed,
  ]);

  return (
    <div className="pb-20 pt-40">
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              draggable={false}
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              draggable={false}
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Kontaktieren Sie uns
              </h2>

              <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <Input
                    isRequired={true}
                    value={name}
                    onValueChange={setName}
                    onBlur={() => handleBlur("name")}
                    type="text"
                    variant="underlined"
                    label="Vollständiger Name"
                    className="w-full pb-3.5 lg:w-1/2"
                    isInvalid={touched.name && isInvalidName}
                    errorMessage="Bitte geben Sie Ihren Namen ein"
                    color={touched.name && isInvalidName ? "danger" : "default"}
                  />

                  <Input
                    isRequired={true}
                    value={email}
                    onValueChange={setEmail}
                    onBlur={() => handleBlur("email")}
                    isInvalid={touched.email && isInvalidEmail}
                    color={
                      touched.email && isInvalidEmail ? "danger" : "default"
                    }
                    errorMessage="Bitte geben Sie eine gültige E-Mail-Adresse ein"
                    variant="underlined"
                    label="E-Mail-Adresse"
                    type="email"
                    className="w-full pb-3.5 lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <Input
                    isRequired={true}
                    value={subject}
                    onValueChange={setSubject}
                    onBlur={() => handleBlur("subject")}
                    type="text"
                    variant="underlined"
                    label="Betreff"
                    className="w-full pb-3.5 lg:w-1/2"
                    isInvalid={touched.subject && isInvalidSubject}
                    errorMessage="Bitte geben Sie einen Betreff ein"
                    color={
                      touched.subject && isInvalidSubject ? "danger" : "default"
                    }
                  />

                  <Input
                    isRequired={true}
                    value={phone}
                    onValueChange={setPhone}
                    onBlur={() => handleBlur("phone")}
                    type="text"
                    variant="underlined"
                    label="Telefonnummer"
                    className="w-full pb-3.5 lg:w-1/2"
                    isInvalid={touched.phone && isInvalidPhone}
                    errorMessage="Bitte geben Sie eine gültige Telefonnummer ein"
                    color={
                      touched.phone && isInvalidPhone ? "danger" : "default"
                    }
                  />
                </div>

                <div className="mb-11.5 flex">
                  <Textarea
                    isRequired={true}
                    value={message}
                    onValueChange={setMessage}
                    onBlur={() => handleBlur("message")}
                    variant="underlined"
                    label="Nachricht"
                    labelPlacement="inside"
                    rows={4}
                    className="w-full "
                    isInvalid={touched.message && isInvalidMessage}
                    errorMessage="Bitte geben Sie eine Nachricht ein"
                    color={
                      touched.message && isInvalidMessage ? "danger" : "default"
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <Checkbox
                      size="lg"
                      isSelected={isAgreed}
                      onValueChange={setIsAgreed}
                    />
                    <p className="flex max-w-[425px] pl-5">
                      Mit dem Absenden dieses Formulars stimmen Sie unseren AGB
                      und Datenschutzbestimmungen zu.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isFormValid}
                    className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out ${
                      isFormValid ? "cursor-pointer" : "cursor-not-allowed"
                    } dark:bg-btndark`}
                  >
                    Nachricht senden
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </Button>
                </div>
              </form>
            </motion.div>

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
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Standort & Kontakt
              </h2>

              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Adresse
                </h3>
                <p>Kifferstraße 19, Köln, Deutschland</p>
              </div>
              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  E-Mail Adresse
                </h3>
                <p>
                  <a href="#">example@example.com</a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Telefonnummer
                </h4>
                <p>
                  <a href="#">+34 123 456 789</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
