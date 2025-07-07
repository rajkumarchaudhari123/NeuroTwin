"use client";
import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage: Message = response.data.choices?.[0]?.message || {
        role: "assistant",
        content: "Something went wrong!",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("❌ API Error:", err.response?.data || err.message);
      alert("Error talking to AI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <header className="text-center text-3xl font-bold py-6 bg-black/30 backdrop-blur border-b border-gray-700">
        🤖 NeuroTwin AI
      </header>

      {/* Chat Body */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`w-fit max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-600"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-700 px-4 py-2 rounded-2xl w-fit text-sm animate-pulse">
            Typing...
          </div>
        )}
        <div ref={bottomRef}></div>
      </main>

      {/* Input Area */}
      <div className="bg-black/40 backdrop-blur p-4 sticky bottom-0 w-full border-t border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-3 rounded-full bg-[#222] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
