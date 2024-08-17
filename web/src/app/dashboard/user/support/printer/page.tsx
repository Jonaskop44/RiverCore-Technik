"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDisclosure } from "@nextui-org/react";
import NewChatModal from "@/app/dashboard/components/User/Support/NewChatModal";

const PrinterSupport = () => {
  const [chats, setChats] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {});

  return (
    <div>
      <NewChatModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex">
        <aside className="w-1/4 border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Aktive Konversationen</h2>
            <button
              onClick={onOpen}
              className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
              Neue Konversation starten
            </button>
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
    </div>
  );
};

export default PrinterSupport;
