"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "next-themes";
import "./quill-custom.css";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsletterEditor = () => {
  const [content, setContent] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const { theme } = useTheme();
  const apiClient = new ApiClient();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const handleSendNewsletter = async () => {
    try {
      const users =
        await apiClient.mail.newsletter.getAllNewsletterSubscribers();
      console.log(users);

      users.data.forEach(async (user: User) => {
        await apiClient.mail.newsletter.sendNewsletter(
          user.email,
          subject,
          content
        );
      });
    } catch (error) {
      console.log("Error getting subscribers", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Betreff"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
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
      <button onClick={handleSendNewsletter}>Senden</button>
    </div>
  );
};

export default NewsletterEditor;
