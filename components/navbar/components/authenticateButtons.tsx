import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AuthenticateButtons() {
  return (
    <div className="flex gap-4 ml-auto">
      <Button asChild variant="outline" className="font-light">
        <Link href={"/login"}>Sign In</Link>
      </Button>
      <Button asChild className="font-light">
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
}
