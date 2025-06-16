// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4 animate-pulse">
        🧠 NeuroTwin
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8 text-gray-300">
        Tumhara AI-Powered Cognitive Clone – Jo tumhari tarah sochta, likhta aur
        jawab deta hai.
      </p>

      <Link href="/chat">
        <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
          Try Your Twin →
        </button>
      </Link>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl">
        <Feature
          icon="💬"
          title="Chat Like You"
          desc="NeuroTwin tumhari tarah baat karta hai – same style, same tone."
        />
        <Feature
          icon="🧠"
          title="Smart Memory"
          desc="Preferences, goals aur past chats yaad rakhta hai."
        />
        <Feature
          icon="🎙"
          title="Voice Control"
          desc="Tum voice se bhi apne twin se baat kar sakte ho."
        />
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 transition">
      <h3 className="text-3xl mb-2">
        {icon} {title}
      </h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
