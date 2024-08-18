"use client";

import NewChatModal from "@/app/dashboard/components/User/Support/NewChatModal";
import { useUserStore } from "@/data/userStore";
import { Avatar, Button, Chip, Input, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import io from "socket.io-client";

const socket = io("ws://localhost:3001", {
  auth: {
    accessToken: `${Cookies.get("accessToken")}`,
  },
});

const PageSupport = () => {
  const { profilePicture, user } = useUserStore();
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

    socket.on("chatsList", (_chats) => {
      setChats(_chats);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("chatMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("chatCreated", (chat) => {
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
      <div className="flex bg-white rounded-lg max-h-[600px] h-screen">
        <aside className="w-1/4 border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-black">
              Drucker Support
            </h2>
          </div>
          <div className="p-4">
            <div className="relative mb-4">
              <Button color="primary" onPress={onOpen}>
                Neue Konversation
              </Button>
            </div>
            <ul className="space-y-4">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                  onClick={() => joinChat(chat.id)}
                >
                  <Avatar src={profilePicture} />
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
          <header className="flex items-center p-4 border-b">
            <Avatar src={profilePicture} />
            <div className="ml-3">
              {selectedChat ? (
                <div>
                  <h2 className="text-lg font-semibold">Leon Maier</h2>
                  <p className="text-sm text-muted-foreground">
                    {typingUsers.length > 0 ? (
                      <div>
                        {typingUsers.map((user) => (
                          <span key={user.id}>
                            {user.firstName} {user.lastName} schreibt ...
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div>Online Status</div>
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
          <div
            className="flex-1 p-4 overflow-y-auto"
            ref={messagesContainerRef}
          >
            {selectedChat ? (
              <>
                <ul>
                  {messages.map((message) => (
                    <li
                      key={message.id}
                      className={`flex ${
                        message.user.id === user.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`${
                          message.user.id === user.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        } p-2 rounded-lg max-w-xs`}
                      >
                        <strong>{message.user.firstName}:</strong>{" "}
                        {message.content}
                      </div>
                    </li>
                  ))}
                  <div ref={messagesContainerRef} />{" "}
                  {/* Ref für das Ende der Liste */}
                </ul>
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
