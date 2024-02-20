import Logo from "@/components/logo/logo";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-[100dvh] justify-center">
      <Logo size="large" />
      <h1 className="text-xl mt-20 mb-5">That page doesn't exist</h1>
      <Link href="/" className="text-sky-600">
        Return Home
      </Link>
    </div>
  );
}
