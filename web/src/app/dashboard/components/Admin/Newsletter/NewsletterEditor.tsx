/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "next-themes";
import "./quill-custom.css";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { VscSend } from "react-icons/vsc";
import { motion } from "framer-motion";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsletterEditor = () => {
  const [content, setContent] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const { theme } = useTheme();
  const apiClient = new ApiClient();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response =
          await apiClient.mail.newsletter.getAllNewsletterSubscribers();
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.log("Error getting subscribers", error);
      }
    };

    getUsers();
  }, []);

  const isButtonDisabled = () => {
    const cleanContent = content.trim();
    const cleanSubject = subject.trim();

    return (
      cleanContent === "" ||
      cleanContent === "<p><br></p>" ||
      cleanSubject === "" ||
      cleanSubject === "<p><br></p>" ||
      users.length === 0
    );
  };

  const handleSendNewsletter = async () => {
    let status = true;

    try {
      for (const user of users) {
        const response = await apiClient.mail.newsletter.sendNewsletter(
          user.email,
          subject,
          content
        );

        if (!response.status) {
          status = false;
          break;
        }
      }

      if (status) {
        toast.success("Newsletter wurde erfolgreich versendet");
        setContent("");
        setSubject("");
        return;
      } else {
        toast.error("Fehler beim Versenden des Newsletters");
      }
    } catch (error) {
      toast.error("Fehler beim Versenden des Newsletters");
    }
  };

  return (
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
      transition={{ duration: 1, delay: 0.35 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-blacksection shadow-md rounded-lg p-4"
    >
      <div className="block justify-between mb-10 sm:flex">
        {/* usercount for small screens */}
        <div className="block sm:hidden mb-5">
          {users.length > 0 ? (
            <p className="text-black dark:text-white font-bold">
              {users.length} {users.length === 1 ? "Abonnent" : "Abonnenten"}
            </p>
          ) : (
            <p className="text-black font-black dark:text-white">
              Keine Abonnenten
            </p>
          )}
        </div>

        {/* Input-Field */}
        <Input
          label="Betreff"
          variant="underlined"
          className="max-w-[250px] w-full sm:w-1/2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Usercount for big screens */}
        <div className="hidden sm:block">
          {users.length > 0 ? (
            <p className="text-black dark:text-white font-bold mt-5">
              {users.length} {users.length === 1 ? "Abonnent" : "Abonnenten"}
            </p>
          ) : (
            <p className="text-black font-black mt-5 dark:text-white ">
              Keine Abonnenten
            </p>
          )}
        </div>
      </div>

      <div className={theme === "dark" ? "quill-dark" : "quill-light"}>
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          value={content}
          onChange={(e) => {
            setContent(e);
          }}
          theme="snow"
        />
      </div>

      <Button
        onPress={handleSendNewsletter}
        color="primary"
        className="mt-6"
        isDisabled={isButtonDisabled()}
        startContent={<VscSend size={20} />}
      >
        Newsletter senden
      </Button>
    </motion.div>
  );
};

export default NewsletterEditor;
