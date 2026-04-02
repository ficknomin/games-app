import { LoginForm } from "@/components/LoginForm";
import { Card } from "@/components/ui/card";

const LoginPage = () => {

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm rounded-sm bg-card p-8 shadow-lg">
        <h1 className="mb-6 text-xl font-semibold tracking-light">Sign in to your account</h1>
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage;
