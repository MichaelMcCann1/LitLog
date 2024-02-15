import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { Separator } from "@/components/ui/separator";
import NavMenuItems from "./components/navMenuItems";
import UserInfo from "./components/userInfo";
import { Menu } from "lucide-react";

export default function NavMenu() {
  return (
    <div className="md:hidden ml-auto h-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="ml-auto" size='icon'>
            <Menu size={34}/>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <NavMenuItems />
          <Separator className="my-4" />
          <UserInfo />
        </SheetContent>
      </Sheet>
    </div>
  );
}
