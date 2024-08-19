/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import NewChatModal from "@/app/dashboard/components/User/Support/NewChatModal";
import { useUserStore } from "@/data/userStore";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import io from "socket.io-client";
import { IoMdAddCircle } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const socket = io("ws://localhost:3001", {
  auth: {
    accessToken: `${Cookies.get("accessToken")}`,
  },
});

const supportSections = [
  {
    key: "Printer",
    label: "Drucker",
  },
  {
    key: "Payment",
    label: "Kassen",
  },
  {
    key: "Network",
    label: "Netzwerk",
  },
];

const PageSupport = () => {
  const { user, getProfilePicture } = useUserStore();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newChatTitle, setNewChatTitle] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const typingTimeoutRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket.emit("getChats");

    socket.on("userStatus", ({ userId, status }) => {
      setOnlineUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        updatedUsers[userId] = status;
        return updatedUsers;
      });
    });

    socket.on("chatsList", async (_chats) => {
      const chatsWithProfilePictures = await Promise.all(
        _chats.map(async (chat) => {
          const picture = await getProfilePicture(chat.user);
          return {
            ...chat,
            user: {
              ...chat.user,
              profilePicture: picture,
            },
          };
        })
      );

      setChats(chatsWithProfilePictures);
    });

    socket.on("receiveMessage", (message) => {
      getProfilePicture(message.user).then((picture) => {
        message.user.profilePicture = picture;
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    });

    socket.on("chatMessages", (messages) => {
      const messagesWithPictures = messages.map((message) => {
        return getProfilePicture(message.user).then((picture) => {
          message.user.profilePicture = picture;
          return message;
        });
      });

      Promise.all(messagesWithPictures).then((updatedMessages) => {
        setMessages(updatedMessages);
      });
    });

    socket.on("chatCreated", (chat) => {
      getProfilePicture(chat.user).then((picture) => {
        chat.user.profilePicture = picture;
        setChats((prevChats) => [...prevChats, chat]);
      });
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
      socket.off("userStatus");
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <div className="flex bg-white rounded-lg max-h-[700px]">
        <aside className="border-r overflow-y-auto">
          <div className="p-4 sticky top-0 bg-white z-10">
            <Select
              label="Support-Bereiche"
              variant="underlined"
              defaultSelectedKeys={[supportSections[0].key]}
            >
              {supportSections.map((section) => (
                <SelectItem key={section.key}>{section.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <Button
                color="primary"
                onPress={onOpen}
                className="w-full"
                startContent={<IoMdAddCircle size={25} className="" />}
              >
                Neues Support-Ticket
              </Button>
            </div>
            <ul className="space-y-4">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                  onClick={() => joinChat(chat.id)}
                >
                  <Avatar src={chat.user.profilePicture} />
                  <div className="flex-1">
                    <p className="font-medium">{chat.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {chat.user.firstName} {chat.user.lastName}
                    </p>
                  </div>
                  <Chip color="primary">10</Chip>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      onlineUsers[chat.user.id] === "ONLINE"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="flex-1 flex flex-col">
          {selectedChat && (
            <header className="flex items-center p-4 border-b">
              <Avatar
                src={
                  chats.find((chat) => chat.id === selectedChat).user
                    .profilePicture
                }
              />
              <div className="ml-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    {
                      chats.find((chat) => chat.id === selectedChat).user
                        .firstName
                    }{" "}
                    {
                      chats.find((chat) => chat.id === selectedChat).user
                        .lastName
                    }
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {typingUsers.length > 0 ? (
                      <div>
                        {typingUsers.length === 1 ? (
                          <span>
                            {typingUsers[0].firstName} {typingUsers[0].lastName}{" "}
                            schreibt...
                          </span>
                        ) : (
                          <span>
                            {typingUsers
                              .map(
                                (user) => `${user.firstName} ${user.lastName}`
                              )
                              .join(", ")}{" "}
                            schreiben...
                          </span>
                        )}
                      </div>
                    ) : (
                      <div>
                        {
                          chats.find((chat) => chat.id === selectedChat).user
                            .firstName
                        }{" "}
                        {
                          chats.find((chat) => chat.id === selectedChat).user
                            .lastName
                        }{" "}
                        {onlineUsers[
                          chats.find((chat) => chat.id === selectedChat).user.id
                        ] === "ONLINE"
                          ? "ist online"
                          : "ist offline"}
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </header>
          )}
          <div
            className="flex-1 p-4 overflow-y-auto"
            ref={messagesContainerRef}
          >
            {selectedChat ? (
              <>
                <ul>
                  {messages.map((message) => {
                    const messageTime = new Date(
                      message.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <li
                        key={message.id}
                        className={`flex ${
                          message.user.id === user.id
                            ? "justify-end"
                            : "justify-start"
                        } items-center`}
                      >
                        {message.user.id !== user.id && (
                          <Avatar
                            src={message.user.profilePicture}
                            alt={`${message.user.firstName} ${message.user.lastName}`}
                            className="m-3"
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {message.user.firstName} {message.user.lastName}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {messageTime}
                            </span>
                          </div>
                          <div
                            className={`flex flex-col w-full max-w-[320px] p-2 leading-1.5 text-black dark:bg-gray-700 ${
                              message.user.id === user.id
                                ? "bg-blue-500 rounded-bl-xl rounded-br-xl rounded-tl-xl"
                                : "bg-gray-200 rounded-e-xl rounded-es-xl"
                            }`}
                          >
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span className="inline-flex self-center items-center text-sm font-medium text-gray-900 dark:text-white">
                                {message.content}
                              </span>
                            </div>
                          </div>
                        </div>
                        {message.user.id === user.id && (
                          <Avatar
                            src={message.user.profilePicture}
                            alt={`${message.user.firstName} ${message.user.lastName}`}
                            className="m-3"
                          />
                        )}
                      </li>
                    );
                  })}
                  <div ref={messagesContainerRef} />{" "}
                </ul>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <h1 className="text-black font-bold text-2xl">
                  {chats.length > 0
                    ? "Bitte wähle einen Chat aus um mit dem Support zu schreiben."
                    : "Um mit dem Support zu schreiben, erstelle ein neues Ticket."}
                </h1>
              </div>
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

export default PageSupport;
