"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Background from "@/components/Background";

// Define proper types for API responses
interface ModelResponse {
  data: Array<{
    id: string;
    active: boolean;
  }>;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [apiKeyStatus, setApiKeyStatus] = useState<"checking" | "valid" | "invalid">("checking");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check API key and fetch models
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!apiKey) {
      setApiKeyStatus("invalid");
    } else {
      setApiKeyStatus("valid");
      fetchAvailableModels();
    }
  }, []);

  const fetchAvailableModels = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!apiKey) return;

      const response = await axios.get<ModelResponse>("https://api.groq.com/openai/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 5000,
      });

      // Filter for active chat models
      const chatModels = response.data.data
        .filter((model) => {
          const id = model.id.toLowerCase();
          return (id.includes('llama') || 
                  id.includes('mixtral') || 
                  id.includes('gemma') ||
                  id.includes('mistral')) &&
                  model.active === true;
        })
        .map((model) => model.id)
        .sort();

      setAvailableModels(chatModels);
      
      if (chatModels.length > 0) {
        setSelectedModel(chatModels[0]);
      } else {
        // Fallback models
        const fallbackModels = [
          "llama-3.3-70b-versatile",
          "llama-3.1-8b-instant",
          "llama3-70b-8192",
        ];
        setAvailableModels(fallbackModels);
        setSelectedModel(fallbackModels[0]);
      }
    } catch (error) {
      console.error("Failed to fetch models:", error);
      // Fallback models
      const fallbackModels = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "llama3-70b-8192",
      ];
      setAvailableModels(fallbackModels);
      setSelectedModel(fallbackModels[0]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedModel) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: selectedModel,
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 1024,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      const aiContent = response.data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
      
      const aiMessage: Message = {
        role: "assistant",
        content: aiContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("❌ API Error:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Authentication failed. Please check your API key.");
        } else if (error.response?.status === 429) {
          alert("Rate limit exceeded. Please try again later.");
        } else if (error.code === 'ECONNABORTED') {
          alert("Request timeout. Please try again.");
        } else if (error.code === 'ERR_NETWORK') {
          alert("Network error. Please check your internet connection.");
        } else {
          const errorData = error.response?.data as { error?: { message?: string } };
          const errorMessage = errorData?.error?.message || error.message;
          
          // Check if model is decommissioned
          if (errorMessage?.includes("decommissioned")) {
            alert(`Model "${selectedModel}" is no longer available. Refreshing model list...`);
            await fetchAvailableModels();
          } else {
            alert(`Error: ${errorMessage}`);
          }
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (apiKeyStatus === "invalid") {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <Background />
        <div className="relative z-10 max-w-3xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <div className="bg-red-900/50 border border-red-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Configuration Error</h2>
            <p>Please add your Groq API key to .env.local:</p>
            <pre className="bg-black/50 p-3 rounded mt-2">
              NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">
          🤖 JARVIS - Chat
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
          {/* Model Selector */}
          {availableModels.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <label className="text-sm text-gray-300">Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={loading}
                className="flex-1 bg-black/50 text-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto mb-4 pr-2 scroll-smooth">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                <p>👋 Hello! How can I help you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
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
              ))
            )}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="rounded-2xl px-4 py-2 bg-white text-black text-sm animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>

          {/* Input Area */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-3 border border-gray-600 rounded-xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Type your message..."
                disabled={loading}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>💡 Type your message and press Enter or click Send</p>
        </div>
      </div>
    </div>
  );
}