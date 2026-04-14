"use client";

import { useAuthActions } from "@/app/features/auth/auth.service";
import { AuthError } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/app/shared/ui/field";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/hooks/use-auth.hook";
import { useEffect } from "react";
import { toast } from "sonner";

type RegisterFormData = {
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { signUp } = useAuthActions();
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/games");
    }
  }, [user, router]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password);
      toast.info("Check your email to confirm!");
      router.push("/login");
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
            Sign Up
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
