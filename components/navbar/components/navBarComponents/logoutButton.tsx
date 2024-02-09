"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

interface Props {
  callback: () => Promise<void>;
}

export default function LogoutButton({ callback }: Props) {
  return (
    <DropdownMenuItem onClick={() => callback()}>
      <button className="pointer">Sign Out</button>
    </DropdownMenuItem>
  );
}
