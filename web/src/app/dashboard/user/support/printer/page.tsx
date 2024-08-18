"use client";

import NewChatModal from "@/app/dashboard/components/User/Support/NewChatModal";
import { useUserStore } from "@/data/userStore";
import { Avatar, Button, Chip, Input, useDisclosure } from "@nextui-org/react";
import Cookies, { set } from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import io from "socket.io-client";

const socket = io("ws://localhost:3001", {
  auth: {
    accessToken: `${Cookies.get("accessToken")}`,
  },
});

const PrinterSupport = () => {
  const { profilePicture } = useUserStore();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newChatTitle, setNewChatTitle] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const typingTimeoutRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    socket.emit("getChats");

    socket.on("chatsList", (_chats) => {
      console.log(_chats);
      setChats(_chats);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("chatMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("chatCreated", (chat) => {
      console.log(chat);
      setChats((prevChats) => [...prevChats, chat]);
    });

    socket.on("userTyping", (typingUser) => {
      setTypingUsers((prevUsers) => [...prevUsers, typingUser]);
    });

    socket.on("userStoppedTyping", (stoppedTypingUser) => {
      setTypingUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== stoppedTypingUser.id)
      );
    });

    return () => {
      socket.off("chatsList");
      socket.off("receiveMessage");
      socket.off("chatMessages");
      socket.off("chatCreated");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!typingTimeoutRef.current) {
      socket.emit("typing", { chatId: selectedChat });
    }

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId: selectedChat });
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const createChat = () => {
    if (newChatTitle.trim()) {
      socket.emit("createChat", { title: newChatTitle });
      onOpenChange();
      setNewChatTitle("");
    }
  };

  const joinChat = (chatId: number) => {
    setSelectedChat(chatId);
    socket.emit("joinChat", { chatId });
    socket.emit("stopTyping", { chatId });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { content: newMessage, chatId: selectedChat });
      setNewMessage("");
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
      socket.emit("stopTyping", { chatId: selectedChat });
    }
  };

  return (
    <div>
      <NewChatModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title={newChatTitle}
        setTitle={setNewChatTitle}
        handleCreateChat={createChat}
      />
      <div className="flex bg-white rounded-lg max-h-[600px] h-screen">
        <aside className="w-1/4 border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-black">
              Drucker Support
            </h2>
          </div>
          <div className="p-4">
            <div className="relative mb-4">
              {/* <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10" /> */}
              <Button color="primary" onPress={onOpen}>
                Neue Konversation
              </Button>
            </div>
            <ul className="space-y-4">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => joinChat(chat.id)}
                >
                  <Avatar src={profilePicture} />
                  <div className="flex-1">
                    <p className="font-medium">{chat.title}</p>
                    <p className="text-sm text-muted-foreground">Name</p>
                  </div>
                  <Chip color="primary">10</Chip>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      "online" === "online" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="flex-1 flex flex-col">
          <header className="flex items-center p-4 border-b">
            <Avatar src={profilePicture} />
            <div className="ml-3">
              {selectedChat ? (
                <div>
                  <h2 className="text-lg font-semibold">Leon Maier</h2>
                  <p className="text-sm text-muted-foreground">
                    {typingUsers.length > 0 && (
                      <div>
                        {typingUsers.map((user) => (
                          <span key={user.id}>
                            {user.firstName} {user.lastName} schreibt ...
                          </span>
                        ))}
                      </div>
                    )}
                  </p>
                </div>
              ) : (
                <h2 className="text-lg font-semibold">
                  Wähle eine Konversation aus
                </h2>
              )}
            </div>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedChat ? (
              <>
                <ul>
                  {messages.map((message) => (
                    <li key={message.id}>
                      <strong>{message.user.firstName}:</strong>{" "}
                      {message.content}
                    </li>
                  ))}
                </ul>
                {/* {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    chat.from === "me" ? "justify-end" : ""
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      chat.from === "me" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <p>{chat.message}</p>
                    <span className="block mt-1 text-xs text-muted-foreground">
                      {chat.time}
                    </span>
                  </div>
                </div>
              ))} */}
              </>
            ) : (
              <p>Wähle eine Konversation aus</p>
            )}
          </div>
          <footer className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                isDisabled={!selectedChat}
                placeholder="Gib eine Nachricht ein."
                className="flex-1"
                value={newMessage}
                onChange={handleTyping}
              />
              <Button variant="ghost" isDisabled={!selectedChat}>
                <FiPaperclip className="h-6 w-6 text-black" />
              </Button>
              <Button
                variant="ghost"
                onPress={sendMessage}
                isDisabled={!selectedChat}
              >
                <IoIosSend className="h-6 w-6 text-black" />
              </Button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default PrinterSupport;
