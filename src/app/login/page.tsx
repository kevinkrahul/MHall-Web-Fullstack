"use client";
import { login} from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

const [error,setError]=useState<string | null>(null);

async function handleLogin(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData=new FormData(e.currentTarget)
  const response = await login(formData);

  if (response?.error)
  {
    setError(response.error);
  }
} 



  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="/forgetpassword"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                  <Button
                    className="w-full"
                    variant={"outline"}
                  >
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup/new/verify-otp"} className="underline underline-offset-4">
                    Sign up
                  </Link>

                  {error && <p className="text-red-500">{error}</p>}

                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
