import React from "react";
import SignInForm from "./form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-neutral-100 p-5">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
