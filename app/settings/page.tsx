// app/settings/page.tsx

"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("Rajkumar");
  const [email, setEmail] = useState("raj@example.com");
  const [theme, setTheme] = useState("dark");

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Theme</label>
          <select
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
