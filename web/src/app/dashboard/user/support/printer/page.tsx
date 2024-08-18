"use client";

import { useUserStore } from "@/data/userStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("ws://localhost:3001", {
  auth: {
    accessToken: `${Cookies.get("accessToken")}`,
  },
});

const PrinterSupport = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newChatTitle, setNewChatTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    socket.emit("getChats");

    socket.on("chatsList", (_chats) => {
      setChats(_chats);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setTypingUser(null); // Stop typing indicator on message receive
    });

    socket.on("chatMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("chatCreated", (chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    });

    socket.on("userTyping", (username) => {
      setTypingUser(username);
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("chatsList");
      socket.off("receiveMessage");
      socket.off("chatMessages");
      socket.off("chatCreated");
      socket.off("userTyping");
      socket.off("stopTyping");
    };
  }, []);

  const createChat = () => {
    if (newChatTitle.trim()) {
      socket.emit("createChat", { title: newChatTitle });
      setNewChatTitle("");
    }
  };

  const joinChat = (chatId) => {
    setSelectedChat(chatId);
    socket.emit("joinChat", { chatId });
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { chatId: selectedChat, username: user.firstName });
    }
  };

  const stopTyping = () => {
    setIsTyping(false);
    socket.emit("stopTyping", { chatId: selectedChat });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { content: newMessage, chatId: selectedChat });
      setNewMessage("");
      stopTyping();
    }
  };

  return (
    <div>
      <div className="flex">
        <aside className="w-1/4 border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Aktive Konversationen</h2>
            <input
              type="text"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              placeholder="Titel der neuen Konversation..."
            />
            <button
              onClick={createChat}
              className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
              Neue Konversation starten
            </button>
            <ul>
              {chats.map((chat) => (
                <li key={chat.id} onClick={() => joinChat(chat.id)}>
                  Chat {chat.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="flex-1 p-4">
          {selectedChat ? (
            <>
              <h2 className="text-lg font-semibold">Nachrichten</h2>
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    {user.firstName}: {message.content}
                  </li>
                ))}
                {typingUser && <li>{typingUser} is typing...</li>}
              </ul>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onBlur={stopTyping} // Stop typing when input loses focus
                placeholder="Nachricht eingeben..."
              />
              <button onClick={sendMessage}>Senden</button>
            </>
          ) : (
            <p>Wähle eine Konversation aus</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default PrinterSupport;
