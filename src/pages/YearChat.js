import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, onChildAdded, push, off, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function OpenChatRoom() {
  const { year } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const db = getDatabase();
  const messagesRef = ref(db, `chatRooms/${year}/messages`);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserName(data.uniquename);
        }
      });
    }
  }, [db]);

  useEffect(() => {
    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg.timestamp === newMessage.timestamp)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    };

    onChildAdded(messagesRef, handleNewMessage);

    return () => {
      off(messagesRef, "child_added", handleNewMessage);
    };
  }, [messagesRef]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (messageInput.trim() !== "" && userName && currentUser) {
      const newMessage = {
        user: userName,
        email: currentUser.email,
        text: messageInput,
        timestamp: Date.now(),
      };

      push(messagesRef, newMessage);
      setMessageInput("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <header className="flex items-center justify-between px-4 py-3 bg-purple-800 shadow-lg border-b border-purple-700">
        <button
          onClick={() => {
            navigate("/year-based");
          }}
          className="flex items-center space-x-2 text-white border border-purple-600 hover:bg-purple-700 p-2 rounded-full transition"
        >
          <span>⬅️</span>
          <span>Back</span>
        </button>
        <h1 className="text-lg font-bold">Chat Room - {year}</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
        </div>
      </header>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.user === userName ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                msg.user === userName
                  ? "bg-purple-700 text-right"
                  : "bg-gray-800 text-left"
              } max-w-xs px-4 py-2 rounded-lg shadow-lg text-sm`}
            >
              <span className="block font-semibold text-pink-400 mb-1">
                {msg.user}
              </span>
              <p className="text-gray-200">{msg.text}</p>
              <span className="block text-gray-400 text-[10px] mt-1 text-right">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center px-4 py-3 bg-gray-800 shadow-lg">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-gray-700 rounded-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
