import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AuthenticateButtons() {
  return (
    <div className="flex gap-4 ml-auto">
      <Button asChild variant="outline">
        <Link href={"/login"}>Sign In</Link>
      </Button>
      <Button asChild>
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
}
