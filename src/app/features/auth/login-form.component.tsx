"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/app/shared/ui/button";
import { Checkbox } from "@/app/shared/ui/checkbox";
import { Input } from "@/app/shared/ui/input";
import { Label } from "@/app/shared/ui/label";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "./auth.service";

export const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn(data);

      if (response.success) {
        router.push("/games");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5">
          Email address*
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder="Enter your email address"
          {...register("email")}
        />
      </div>

      {/* Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          Password*
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isVisible ? "text" : "password"}
            placeholder="••••••••••••••••"
            className="pr-9"
            {...register("password")}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between gap-y-2">
        <div className="flex items-center gap-3">
          <Checkbox id="rememberMe" className="size-6" />
          <Label htmlFor="rememberMe" className="text-muted-foreground">
            {" "}
            Remember Me
          </Label>
        </div>

        <a href="#" className="hover:underline">
          Forgot Password?
        </a>
      </div>

      <Button className="w-full" type="submit">
        Sign in
      </Button>
    </form>
  );
};
