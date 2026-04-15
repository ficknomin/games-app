"use client";

import { useAuth } from "@/app/shared/hooks";
import { Button } from "@/app/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/shared/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/features/auth";

export const UserButton = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="hover:cursor-pointer rounded-sm">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 rounded-xs" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {user ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="hover:cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => router.push("/login")}
                className="hover:cursor-pointer"
              >
                Sign in
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/register")}
                className="hover:cursor-pointer"
              >
                Sign up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
