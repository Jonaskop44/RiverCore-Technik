/* eslint-disable @next/next/no-img-element */
"use client";

import SectionHeader from "@/components/Common/SectionHeader";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    bio: "Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.",
    email: "gert.schwanter@elbe.at",
    number: "Tel.: +43 4242/51 115",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    bio: "Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.",
    email: "gert.schwanter@elbe.at",
    number: "Tel.: +43 4242/51 115",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    bio: "Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.",
    email: "gert.schwanter@elbe.at",
    number: "Tel.: +43 4242/51 115",
  },
];

const Team = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen py-[80rem] xl:py-[58rem] lg:py-[47rem] md:py-[43rem] sm:py-[45rem]">
      <div>
        <SectionHeader
          headerInfo={{
            title: "Team".toUpperCase(),
            subtitle: "Lernen Sie unser Team kennen",
            description: `Hier finden Sie alle Informationen über unser Team und die Personen, die hinter unserem Unternehmen stehen.`,
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
        >
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              <div className="lg:col-span-2">
                <ul role="list">
                  {people.map((person) => (
                    <li key={person.name} className="sm:py-8">
                      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0 animate_top rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5">
                        <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                          <Image
                            isZoomed
                            src={person.imageUrl}
                            alt="Person Image"
                            className="object-cover shadow-lg rounded-lg"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <div className="space-y-4">
                            <div className="text-lg leading-6 font-medium space-y-1">
                              <h3 className="text-xl font-semibold text-black dark:text-white">
                                {person.name}
                              </h3>
                              <p className="text-sky-500">{person.role}</p>
                            </div>
                            <div className="text-lg">
                              <p className="">{person.bio}</p>
                            </div>
                            <ul role="list">
                              <li className="mb-2">
                                <p
                                  onClick={() => copyToClipboard(person.email)}
                                  className="transition-colors duration-500 hover:text-sky-500 cursor-pointer"
                                >
                                  {person.email}
                                </p>
                              </li>
                              <li>
                                <p
                                  onClick={() => copyToClipboard(person.number)}
                                  className="transition-colors duration-500 hover:text-sky-500 cursor-pointer"
                                >
                                  {person.number}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
