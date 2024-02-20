"use client";

import React from "react";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "../../navBarComponents/navItems";

const activeLinkClasses = "underline text-sky-600";

export default function NavMenuItems() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
      {navItems.map((navItem) => (
        <SheetClose asChild key={navItem.text}>
          <Link
            className={cn("text-xl font-medium", {
              [activeLinkClasses]: pathname === navItem.href,
            })}
            href={navItem.href}
          >
            {navItem.text}
          </Link>
        </SheetClose>
      ))}
    </nav>
  );
}
