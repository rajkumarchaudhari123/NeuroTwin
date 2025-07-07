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
    <div className="relative min-h-screen bg-black flex items-center justify-center flex-col gap-8 overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(white_1px,transparent_1px)] bg-[3px_3px] opacity-30 animate-[starScroll_100s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(cyan_1px,transparent_1px)] bg-[2px_2px] opacity-20 animate-[starScroll_150s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(#0ff_1px,transparent_1px)] bg-[1px_1px] opacity-10 animate-[starScroll_200s_linear_infinite]"></div>
      </div>

      {/* Planet Orbit Animation */}
      <div className="absolute top-1/2 left-1/2 z-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-800 animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-6 h-6 bg-cyan-400 rounded-full shadow-lg -translate-x-1/2"></div>
      </div>

      {/* Scanner */}
      <div className="relative z-10 w-40 h-40 border-4 border-cyan-500 rounded-full animate-pulse">
        <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-t-2 border-cyan-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>

      {/* Text Typing */}
      <h1 className="z-10 text-cyan-400 text-2xl md:text-4xl font-mono tracking-wide text-center">
        {text}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
}
