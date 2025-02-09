import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-50 to-white items-center space-y-8 justify-center p-4">
      <div className="text-4xl font-bold">Sign In</div>
      <SignIn forceRedirectUrl="/dashboard" signUpUrl="/auth/signin" />
    </div>
  );
}
