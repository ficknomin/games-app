"use client";

import { useAuthActions } from "@/hooks/useAuthActions";
import { AuthError } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { signIn } = useAuthActions();
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/games");
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      router.push("/games");
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error happened!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            className="rounded-sm"
            placeholder="Enter your email"
            {...register("email")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            className="rounded-sm"
            placeholder="Enter a password"
            {...register("password")}
          />
        </Field>
        <Field className="pt-2">
          <Button type="submit" className="w-full rounded-sm">
            Sign In
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
