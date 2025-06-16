// app/journal/page.tsx

"use client";

import { useState } from "react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [journal, setJournal] = useState<string[]>([]);

  const handleSubmit = () => {
    if (entry.trim()) {
      setJournal([entry, ...journal]);
      setEntry("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Journal & Reflection</h1>

      <textarea
        className="w-full p-4 border border-gray-700 rounded bg-gray-800 text-white mb-4"
        placeholder="Write your thoughts, ideas or reflections..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={5}
      />

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-8"
        onClick={handleSubmit}
      >
        Save Entry
      </button>

      <div className="space-y-4">
        {journal.length === 0 && (
          <p className="text-gray-400">No journal entries yet.</p>
        )}

        {journal.map((note, index) => (
          <div
            key={index}
            className="p-4 bg-gray-900 rounded border border-gray-700"
          >
            <p className="text-white">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
