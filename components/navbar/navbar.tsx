import React from "react";
import Logo from "../logo/logo";
import NavItems from "./components/navItems";
import { auth } from "@/auth";
import AuthenticateButtons from "./components/authenticateButtons";
import UserProfile from "./components/UserProfile";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="sticky z-10 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full gap-20">
        <Logo />
        <NavItems />
        {session?.user ? <UserProfile /> : <AuthenticateButtons />}
      </div>
    </div>
  );
}
