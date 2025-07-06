/*
📦 Smart Scanner AI Project (Next.js 13+ App Router + MongoDB + Tesseract)
*/

// 1. 📁 app/scanner/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

export default function ScannerPage() {
  const [image, setImage] = useState<File | null>(null);
  const [scannedText, setScannedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setScannedText("");
    }
  };

  const handleScan = async () => {
    if (!image) return alert("Upload an image first");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await axios.post("/api/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setScannedText(res.data.text);
    } catch (error) {
      console.error(error);
      alert("Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">🧠 Smart Scanner AI</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <button
          onClick={handleScan}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Scanning..." : "Scan Image"}
        </button>

        {scannedText && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Scanned Text</h2>
            <textarea
              readOnly
              className="w-full border rounded p-2 h-40"
              value={scannedText}
            />
          </div>
        )}
      </div>
    </div>
  );
}
