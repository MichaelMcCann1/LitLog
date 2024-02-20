"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navItems = [
  { text: "Home", href: "/" },
  { text: "My Bookshelves", href: "/bookshelves" },
  // { text: "My Stats", href: "/stats" },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="items-center lg:gap-12 gap-8 h-full hidden md:flex">
      {navItems.map((navItem) => (
        <Link
          key={navItem.text}
          className={cn(
            "border-transparent hover:border-sky-600 h-full flex items-center border-b-4 font-light whitespace-nowrap	lg:text-base text-sm",
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
    </nav>
  );
}
