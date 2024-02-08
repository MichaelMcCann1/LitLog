import { cn } from "@/lib/utils";
import { DM_Mono } from "next/font/google";
import Link from "next/link";
import React from "react";

const font = DM_Mono({ weight: "500", subsets: ["latin"] });
const smallClasses = "text-2xl leading-5";
const largeClasses = "text-7xl leading-[60px]";

interface Props {
  size?: "small" | "large";
}

export default function Logo({ size = "small" }: Props) {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          font.className,
          size === "small" ? smallClasses : largeClasses
        )}
      >
        <div>LIT</div>
        <div>LOG</div>
      </div>
    </Link>
  );
}
