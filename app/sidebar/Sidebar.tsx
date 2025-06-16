"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Chat", href: "/chat" },
  { name: "Upload", href: "/upload" },
  { name: "Journal", href: "/journal" },
  { name: "Settings", href: "/settings" },
  { name: "Voice", href: "/voice" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:flex">
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-black text-white">
        <h1 className="text-xl font-bold">🧠 NeuroTwin</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-900 text-white h-screen p-6 sticky top-0 z-50`}
      >
        <h2 className="text-2xl font-bold mb-8">🧠 NeuroTwin</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded hover:bg-purple-700 transition ${
                pathname === item.href ? "bg-purple-700" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
