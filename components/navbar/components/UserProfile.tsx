import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";
import LogoutButton from "./logoutButton";

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
          <Button className="rounded-full" size="icon" variant="outline">
            <PersonStandingIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <div className="px-4 py-2">
            <div className="font-medium">{session?.user?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </div>
          </div>
          <DropdownMenuSeparator />
          <LogoutButton callback={logoutButtonCallback}/>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function PersonStandingIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}
