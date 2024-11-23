"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";
import { LoaderCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

const SignInForm = () => {
  const [error, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  return (
    <Card className="w-full md:w-[300px]">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">Selamat Datang!</h1>
      </CardHeader>
      <CardContent>
        <form className="space-y-3" action={action}>
          {error && <Alert variant={"destructive"}>{error}</Alert>}
          <Input name="email" placeholder="Email" type="email" required />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <Button
            type="submit"
            variant={"default"}
            className="w-full"
            disabled={pending}
          >
            {pending ? (
              <LoaderCircle className="animate-spin text-2xl" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
