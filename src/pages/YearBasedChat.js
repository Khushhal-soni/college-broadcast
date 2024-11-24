import React from "react";
import { useNavigate } from "react-router-dom";

export default function YearBasedChat() {
  const navigate = useNavigate();
  const handleEnterChatRoom = (year) => {
    navigate(`/chat-room/${year}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white">
      <header className="flex items-center justify-between px-6 py-4 bg-teal-700 shadow-lg border-b border-teal-600 relative">
        <button
          onClick={() => navigate("/chat-options")}
          className="absolute left-6 text-white border border-teal-600 hover:bg-teal-700 p-2 rounded-full transition"
        >
          <span>⬅️ BACK</span>
        </button>
        <div className="w-full text-center">
          <h1 className="text-xl font-semibold tracking-wide">Year-Based Chat Rooms</h1>
          <div className="text-sm font-semibold">Select a year to join the chat room</div>
        </div>
      </header>

      
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {["1st Year", "2nd Year", "3rd Year", "Final Year"].map((year) => (
            <div
              key={year}
              className="card w-full bg-gradient-to-r from-green-500 to-teal-600 shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg"
            >
              <div className="card-body text-center py-8">
                <h2 className="card-title text-xl text-white font-bold">{year}</h2>
                <p className="text-sm text-gray-200 mt-2 mb-4">
                  Join the {year} chat room to talk to your classmates!
                </p>
                <button
                  
                  onClick={() => handleEnterChatRoom(year)}
                  className="btn btn-primary w-full py-3 rounded-lg text-lg font-medium"
                >
                  Open Chat Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <footer className="bg-teal-700 py-3 text-center text-sm">
        <p className="font-semibold">Stay connected and chat with your year group!</p>
      </footer>
    </div>
  );
}
