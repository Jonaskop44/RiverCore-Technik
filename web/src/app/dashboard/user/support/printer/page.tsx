"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useUserStore } from "@/data/userStore";
import { Constants } from "@/api/constants";

const socket = io("http://localhost:3001");

const PrinterSupport = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUserStore();

  useEffect(() => {
    axios.get(`${Constants.API_BASE}/chat/user/${user.id}`).then((response) => {
      setChats(response.data);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const selectChat = (chat) => {
    setSelectedChat(chat);
    axios
      .get(`${Constants.API_BASE}/chat/messages/${chat.id}`)
      .then((response) => {
        setMessages(response.data);
        socket.emit("joinChat", chat.id);
      });
  };

  const createChat = () => {
    const userId = 1; // Beispiel für eine Benutzer-ID
    axios
      .post(`${Constants.API_BASE}/chat/create`, { userId })
      .then((response) => {
        setChats([...chats, response.data]);
      });
  };

  const sendMessage = () => {
    if (selectedChat && newMessage.trim() !== "") {
      socket.emit("sendMessage", {
        chatId: selectedChat.id,
        content: newMessage,
      });
      axios.post(`${Constants.API_BASE}/chat/message/${selectedChat.id}`, {
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex">
      <aside className="w-1/4 border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Aktive Konversationen</h2>
          <button
            onClick={createChat}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Neue Konversation starten
          </button>
          <ul>
            {chats.map((chat) => (
              <li key={chat.id} onClick={() => selectChat(chat)}>
                {`Chat ${chat.id}`}
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
                <li key={message.id}>{message.content}</li>
              ))}
            </ul>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nachricht eingeben..."
            />
            <button onClick={sendMessage}>Senden</button>
          </>
        ) : (
          <p>Wähle eine Konversation aus</p>
        )}
      </main>
    </div>
  );
};

export default PrinterSupport;
