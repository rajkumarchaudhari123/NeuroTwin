// app/upload/page.tsx
"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("✅ File uploaded successfully!");
      } else {
        setStatus("❌ Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("❌ Upload error.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">📁 Upload to Train NeuroTwin</h1>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2"
      />

      {file && <div className="mb-4 text-gray-400">Selected: {file.name}</div>}

      <button
        onClick={handleUpload}
        className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-lg font-medium"
      >
        Upload Now
      </button>

      {status && <p className="mt-4 text-sm text-green-400">{status}</p>}
    </div>
  );
}
