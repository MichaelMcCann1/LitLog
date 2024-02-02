"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Search Books", href: "/books" },
  { text: "My Bookshelves", href: "/user" },
  { text: "My Stats", href: "/stats" },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8">
      {navItems.map((navItem) => (
        <Link
          key={navItem.text}
          className={cn("mx-6 hover:border-b-4 border-sky-600", {
            "text-sky-600 border-b-4 font-medium": pathname === navItem.href,
          })}
          href={navItem.href}
        >
          {navItem.text}
        </Link>
      ))}
    </div>
  );
}
