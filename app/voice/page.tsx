"use client";

import { useEffect, useRef, useState } from "react";

export default function VoicePage() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech") {
        alert("😶 No speech detected. Try speaking clearly into the mic.");
      } else {
        console.error("Speech recognition error:", event.error);
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
    }

    setIsListening(!isListening);
  };

  return (
    <div className="max-w-xl mx-auto text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">🎙️ Talk to NeuroTwin</h1>
      <button
        onClick={toggleListening}
        className={`px-6 py-2 rounded text-white mb-6 ${
          isListening ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isListening ? "Stop Listening" : "Start Talking"}
      </button>

      <div className="p-4 bg-gray-900 rounded border border-gray-700">
        <h2 className="font-semibold text-white mb-2">Transcript:</h2>
        <p className="text-white">{transcript || "Speak something..."}</p>
      </div>
    </div>
  );
}
