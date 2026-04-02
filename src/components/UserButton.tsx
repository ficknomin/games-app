"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/hooks/useAuthActions";

const UserButton = () => {
  const { user } = useAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="hover:cursor-pointer">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {
            user ?
              <>
                <DropdownMenuItem onClick={() => {
                  signOut();
                  router.push("/");
                }} className="hover:cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </>
              :
              <>
                <DropdownMenuItem onClick={() => router.push("/login")} className="hover:cursor-pointer">
                  Sign in
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/register")} className="hover:cursor-pointer">
                  Sign up
                </DropdownMenuItem>
              </>
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default UserButton;
