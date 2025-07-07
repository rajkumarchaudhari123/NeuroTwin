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
  { name: "Scanner", href: "/scanner" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Bar with Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md">
        <button onClick={() => setOpen(true)}>
          <Menu size={28} color="white" />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">🧠 NeuroTwin</h2>
          {/* Close Button Only on Mobile */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded hover:bg-purple-700 transition ${
                pathname === item.href ? "bg-purple-700" : ""
              }`}
              onClick={() => setOpen(false)} // close after click
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Black overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
