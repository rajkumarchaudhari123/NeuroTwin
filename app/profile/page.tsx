// app/profile/page.tsx
"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    const payload = { name, tone, interests, goal };

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("✅ Profile saved!");
      } else {
        setStatus("❌ Error saving profile.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 Your NeuroTwin Profile</h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded bg-gray-800 placeholder-gray-400"
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="Friendly">Friendly</option>
          <option value="Professional">Professional</option>
          <option value="Funny">Funny</option>
          <option value="Serious">Serious</option>
        </select>

        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Your Interests (comma separated)"
          className="w-full px-4 py-2 rounded bg-gray-800 placeholder-gray-400"
        />

        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Your Main Goal with NeuroTwin"
          className="w-full px-4 py-2 rounded bg-gray-800 placeholder-gray-400 h-24"
        />

        <button
          onClick={handleSave}
          className="w-full bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded"
        >
          Save Profile
        </button>

        {status && (
          <p className="text-green-400 text-sm text-center">{status}</p>
        )}
      </div>
    </div>
  );
}
