import { RegisterForm } from "@/components/RegisterForm";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for a Games Hub account",
};

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm rounded-sm bg-card p-8 shadow-lg">
        <h1 className="mb-6 text-xl font-semibold tracking-light">
          Create an account
        </h1>
        <RegisterForm />
      </Card>
    </div>
  );
};

export default RegisterPage;
