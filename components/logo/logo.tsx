import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="font-bold text-2xl leading-5">
        <div>LIT</div>
        <div>LOG</div>
      </div>
    </Link>
  );
}
