import React from "react";
import LoginForm from "./_components/loginForm";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <p>{session && session.user?.email}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Log Out</Button>
      </form>
      <LoginForm />
    </div>
  );
}
