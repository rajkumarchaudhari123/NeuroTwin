"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const fullText = "Welcome to JARVIS AI";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-8">
      {/* Scanner Circle */}
      <div className="w-40 h-40 border-4 border-cyan-500 rounded-full animate-pulse relative">
        <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-t-2 border-cyan-200 rounded-full animate-spin-slow"></div>
      </div>

      {/* Typing Welcome Text */}
      <h1 className="text-cyan-400 text-2xl md:text-4xl font-mono tracking-wide">
        {text}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
}
