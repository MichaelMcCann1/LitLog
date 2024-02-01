"use client";

import React from "react";
import Link from "next/link";
import Logo from "../logo/logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Search Books", href: "/books" },
  { text: "My Bookshelves", href: "/user" },
  { text: "My Stats", href: "/stats" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="sticky z-10 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full gap-20">
        <Logo />
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
      </div>
    </div>
  );
}
