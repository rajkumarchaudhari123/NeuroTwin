"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192", // or "llama3-70b-8192" if needed
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
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">💬 Chat with Groq AI</h1>
      <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto">
        <div className="h-[400px] overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
