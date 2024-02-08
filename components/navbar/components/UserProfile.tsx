import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";
import LogoutButton from "./logoutButton";
import Image from "next/image";

const logoutButtonCallback = async () => {
  "use server";
  await signOut();
};

export default async function UserProfile() {
  const session = await auth();

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full relative"
            size="icon"
            variant="outline"
          >
            <Image src="/user-profile.svg" alt="User Profile" fill />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <div className="px-4 py-2">
            <p className="font-medium">{session?.user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <LogoutButton callback={logoutButtonCallback} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
