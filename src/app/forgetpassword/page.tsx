"use client";

import { useState } from "react";
import { forgetPassword } from "@/app/login/actions";

// export function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setMessage("");

//     const formData = new FormData();
//     formData.append("email", email);

//     const response = await forgetPassword(formData);
//     if (response.error) {
//       setMessage(response.error);
//     } else {
//       setMessage(response.success || "");
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="border p-2 rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Send Reset Link
//         </button>
//         {message && <p className="text-red-500">{message}</p>}
//       </form>
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
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
import { resetPassword } from "@/app/login/actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("email", email);

    const response = await forgetPassword(formData);
    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(response.success || "");
    }
  }

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  async function handleSubmitPassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("otp", otp);
    formData.append("email", email || "");

    const response = await resetPassword(formData);
    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(response.success || "");
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Change Password</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        onClick={handleSubmit}
                        variant="outline"
                        className="ml-auto inline-block text-sm"
                      >
                        Send Otp
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      required
                    />
                    <Label htmlFor="password" className="mt-4">
                      OTP
                    </Label>
                    <Input
                      id="otp"
                      type="otp"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSubmitPassword}
                    className="w-full"
                    variant={"outline"}
                  >
                    Reset
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {message && <p className="text-red-500">{message}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
