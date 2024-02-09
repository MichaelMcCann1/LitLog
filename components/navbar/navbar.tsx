import React from "react";
import Logo from "../logo/logo";
import NavItems from "./components/navBarComponents/navItems";
import { auth } from "@/auth";
import AuthenticateButtons from "./components/navBarComponents/authenticateButtons";
import UserProfile from "./components/navBarComponents/UserProfile";
import BookSearch from "./components/navBarComponents/bookSearch";
import NavMenu from "./components/navMenu/navMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="sticky z-10 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full lg:gap-20 gap-6 h-full">
        <Logo />
        <NavItems />
        <BookSearch />
        <div className="hidden md:flex ml-auto ">
          {session?.user ? <UserProfile /> : <AuthenticateButtons />}
        </div>
        <NavMenu />
      </div>
    </div>
  );
}
