"use client";

import { useUserStore } from "@/data/userStore";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
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
  const [typingUsers, setTypingUsers] = useState([]);
  const { user } = useUserStore();

  const typingTimeoutRef = useRef(null);

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

    // Listen for typing events
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

    // Clear the previous timeout
    clearTimeout(typingTimeoutRef.current);

    // Set a new timeout to emit `stopTyping` if the user stops typing for 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId: selectedChat });
      typingTimeoutRef.current = null;
    }, 2000);
  };

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

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { content: newMessage, chatId: selectedChat });
      setNewMessage("");
      clearTimeout(typingTimeoutRef.current); // Clear the typing timeout when sending a message
      typingTimeoutRef.current = null;
      socket.emit("stopTyping", { chatId: selectedChat });
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
              </ul>
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Nachricht eingeben..."
              />
              <button onClick={sendMessage}>Senden</button>

              {/* Display typing indicator */}
              {typingUsers.length > 0 && (
                <div>
                  {typingUsers.map((typingUser) => (
                    <span key={typingUser.id}>{typingUser.name} tippt...</span>
                  ))}
                </div>
              )}
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
