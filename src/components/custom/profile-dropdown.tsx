"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getRandomColor, getInitials } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const ProfileDropdown = ({ user }: { user: any }) => {
  const router = useRouter();
  console.log("usernhnvjhng", user);
  if (!user) {
    return <div></div>;
  }
  return (
    <div className="flex justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar
            className="cursor-pointer w-10 h-10 rounded-full"
            style={{ backgroundColor: getRandomColor(user.name) }}
          >
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/register")}>
            Register Now
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
