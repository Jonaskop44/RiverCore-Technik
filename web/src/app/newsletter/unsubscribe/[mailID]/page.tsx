"use client";

import ApiClient from "@/api";
import SectionHeader from "@/components/Common/SectionHeader";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface MailIDProps {
  params: { mailID: string };
}

const MailID: React.FC<MailIDProps> = ({ params }) => {
  const [data, setData] = useState<{
    id: string;
    email: string;
  }>(null);
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.mail.newsletter.getMailIDInfo(
        params.mailID
      );

      setData(response.data);
    };
    fetchData();

    console.log("Data: ", data);
  }, [params.mailID]);

  const handleUnsubscribe = async () => {
    const response = await apiClient.mail.newsletter.unsubscribe(data.id);

    if (response.status) {
      toast.success("Du wurdest erfolgreich vom Newsletter abgemeldet.");
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    } else {
      toast.error("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen py-[5rem] xl:py-[10rem] lg:py-[27rem] md:py-[23rem] sm:py-[15rem]">
      <div>
        <SectionHeader
          headerInfo={{
            title: "Newsletter".toUpperCase(),
            subtitle: data?.email
              ? `${data.email}`.split("@")[0]
              : "Loading...",
            description: `Folgen sie der Anleitung um sich vom Newsletter abzumelden.`,
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
          className="mt-5 animate_top rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5 flex justify-center items-center  xl:min-w-[900px] lg:min-w-[900px] "
        >
          <div>
            <h1 className="text-center mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
              Newsletter abmelden
            </h1>
            <p className="text-center">
              Sie wollen sich vom Newsletter abmelden?
              <br />
              Dann klicken Sie auf den darunterliegenden Button.
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="mt-5"
                color="primary"
                size="lg"
                onPress={handleUnsubscribe}
              >
                Abmelden
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MailID;
