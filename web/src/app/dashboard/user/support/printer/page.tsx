"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useUserStore } from "@/data/userStore";
import { Constants } from "@/api/constants";
import ApiClient from "@/api";

const socket = io("http://localhost:3001");

const PrinterSupport = () => {
  const [chats, setChats] = useState([]);
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  const apiClient = new ApiClient();

  const handleCreateChat = async () => {
    const newChat = await apiClient.chat.helper.createChat(title);
    setChats([...chats, newChat]);
  };

  return (
    <div className="flex">
      <aside className="w-1/4 border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Aktive Konversationen</h2>
          <button
            onClick={handleCreateChat}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Neue Konversation starten
          </button>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ul>
            {chats &&
              chats.map((chat) => <li key={chat}>{`Chat ${chat.id}`}</li>)}
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-4">
        {/* {selectedChat ? (
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
        )} */}
      </main>
    </div>
  );
};

export default PrinterSupport;
