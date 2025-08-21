// src/pages/Message.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from '../assets/bgImage.jpg';

const Message = () => {
  const navigate = useNavigate();

  // Dummy list of chats
  const [chats] = useState([
    {
      id: "1",
      name: "Aarav Sharma",
      lastMessage: "Thanks for helping me with Python!",
      time: "10:30 AM",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Meera Patel",
      lastMessage: "When can we do the next session?",
      time: "09:45 AM",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      name: "Rohan Das",
      lastMessage: "Your tips on UI/UX were super helpful 😃",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "4",
      name: "Ananya Gupta",
      lastMessage: "Don’t forget to send me the notes.",
      time: "Monday",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  //Click to open chat
  const openChat = (chatId) => {
    navigate(`/messages/${chatId}`);
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            `url(${heroBg})`,
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray-900/20"></div>

      {/* Main Content */}
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white font-semibold text-lg shadow-md flex items-center justify-between">
          <span>Messages</span>
          <button className="bg-white text-blue-600 px-3 py-1 text-sm rounded-lg hover:bg-gray-100">
            New Chat +
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-white/90 shadow">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => openChat(chat.id)}
              className="flex items-center justify-between bg-white/95 p-3 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                  <p className="text-sm text-gray-600 truncate w-56">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
