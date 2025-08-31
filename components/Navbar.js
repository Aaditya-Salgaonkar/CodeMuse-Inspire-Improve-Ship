"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "README Generator", href: "/readme" },
    { name: "Code Insight", href: "/explain" },
    { name: "Code Maintainance", href: "/comments" },
    { name: "Debugging", href: "/bug" },
    { name: "Code Refactor", href: "/refactor" },
    { name: "Unit test", href: "/test" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md shadow-lg border-b border-indigo-800">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500">
          CodeMuse
        </Link>

        <ul className="flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-xl font-semibold transition-transform transform ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_0_20px_rgba(147,51,234,0.6)] scale-105 text-white"
                      : "text-gray-300 hover:text-white hover:scale-105"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
