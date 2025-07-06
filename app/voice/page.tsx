"use client";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import Background from "@/components/Background";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakEnglish = async (hinglishText: string) => {
    try {
      const res = await axios.post(
        "https://translate.googleapis.com/translate_a/single",
        null,
        {
          params: {
            client: "gtx",
            sl: "hi",
            tl: "en",
            dt: "t",
            q: hinglishText,
          },
        }
      );

      // 🔍 Replace `any` with proper typing
      const englishText =
        (res.data[0] as Array<[string]>).map((d) => d[0]).join("") ||
        hinglishText;

      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.voice =
        speechSynthesis
          .getVoices()
          .find((v) => v.name.includes("Google UK English Female")) ?? null;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } catch (err: unknown) {
      console.error("Translation/Voice Error:", err);
    }
  };

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

      const aiMessage: Message = response.data.choices?.[0]?.message ?? {
        role: "assistant",
        content: "Something went wrong!",
      };

      setMessages((prev) => [...prev, aiMessage]);
      speakEnglish(aiMessage.content);
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("❌ API Error:", err.response?.data || err.message);
      alert("Error talking to AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">
          🤖 JARVIS
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
          <div className="h-[400px] overflow-y-auto mb-4 pr-2 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="rounded-2xl px-4 py-2 bg-white text-black text-sm animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSend()
              }
              className="flex-1 p-3 border border-gray-600 rounded-xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Type in Hinglish or Hindi..."
            />

            <button
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
