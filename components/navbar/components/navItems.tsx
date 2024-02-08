"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { text: "Home", href: "/" },
  { text: "My Bookshelves", href: "/user" },
  { text: "My Stats", href: "/stats" },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 h-full">
      {navItems.map((navItem) => (
        <Link
          key={navItem.text}
          className={cn(
            "mx-4 border-transparent hover:border-sky-600 h-full flex items-center border-b-4 font-light",
            {
              "text-sky-600 border-sky-600 font-medium":
                pathname === navItem.href,
            }
          )}
          href={navItem.href}
        >
          {navItem.text}
        </Link>
      ))}
    </div>
  );
}
