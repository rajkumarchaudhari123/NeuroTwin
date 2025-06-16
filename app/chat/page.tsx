// app/chat/page.tsx
"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I am your NeuroTwin. Ask me anything." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // 🧠 Placeholder: replace this with OpenAI API call
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: "ai", text: `Tumne poocha: "${input}"` },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="text-center py-6 text-2xl font-bold bg-gray-900">
        🧠 Chat with Your NeuroTwin
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-purple-700 self-end ml-auto"
                : "bg-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-900 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
