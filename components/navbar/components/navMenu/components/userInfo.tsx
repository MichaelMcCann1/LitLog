import React from "react";
import { auth } from "@/auth";
import { logoutButtonCallback } from "@/lib/actions";
import LogoutButton from "./logoutButton";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";

export default async function UserInfo() {
  const session = await auth();

  return (
    <div className="text-xl">
      {!session?.user?.name ? (
        <div className="flex flex-col items-start gap-6">
          <SheetClose asChild>
            <Link href={"/login"}>Sign In</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/register"}>Register</Link>
          </SheetClose>
        </div>
      ) : (
        <div>
          <p className="font-medium text-lg">{session.user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {session?.user?.email}
          </p>
          <LogoutButton callback={logoutButtonCallback} />
        </div>
      )}
    </div>
  );
}
