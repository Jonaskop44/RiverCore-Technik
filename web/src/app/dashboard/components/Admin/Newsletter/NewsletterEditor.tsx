"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "next-themes";
import "./quill-custom.css";
import { useEffect, useState } from "react";
import ApiClient from "@/api";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsletterEditor = () => {
  const [content, setContent] = useState<string>("");
  const { theme } = useTheme();
  const apiClient = new ApiClient();

  useEffect(() => {
    console.log(content);
  }, [content]);

  const handleSendNewsletter = async () => {
    try {
      const users =
        await apiClient.mail.newsletter.getAllNewsletterSubscribers();
      console.log(users);
    } catch (error) {
      console.log("Error getting subscribers", error);
    }
  };

  return (
    <div>
      <div className={theme === "dark" ? "quill-dark" : "quill-light"}>
        <ReactQuill
          value={content}
          onChange={(e) => {
            setContent(e);
          }}
          theme="snow"
        />
      </div>
      <button onClick={handleSendNewsletter}>Senden</button>
    </div>
  );
};

export default NewsletterEditor;
