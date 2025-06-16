// app/dashboard/page.tsx
"use client";

import Link from "next/link";

export default function Dashboard() {
  const features = [
    {
      name: "👤 Profile",
      href: "/profile",
      description: "View and edit your NeuroTwin profile",
    },
    {
      name: "💬 Chat",
      href: "/chat",
      description: "Talk to your AI-powered cognitive twin",
    },
    {
      name: "📁 Upload",
      href: "/upload",
      description: "Train your twin with PDFs and notes",
    },
    {
      name: "📝 Journal",
      href: "/journal",
      description: "AI-generated daily reflection & advice",
    },
    {
      name: "⚙️ Settings",
      href: "/settings",
      description: "Customize experience (theme, tone)",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🧠 NeuroTwin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 shadow-lg transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2">{feature.name}</h2>
            <p className="text-gray-400">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
