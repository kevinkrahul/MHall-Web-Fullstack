"use client";

import { signup, verifyOtp } from "@/app/login/actions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", newPassword);
    formData.append("otp", otp);
    const response = await signup(formData);
    if (response?.error) {
      setError(response.error);
    }
    if (response?.success) {
      setSuccess(response.success);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    const response = await verifyOtp(formData);
    if (response?.error) {
      setError(response.error);
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      required
                    />
                    <div className="flex items-center">
                      <Label htmlFor="otp">OTP</Label>
                      <Button
                        onClick={handleSignUp}
                        variant="outline"
                        className="ml-auto inline-block text-sm"
                      >
                        Send Otp
                      </Button>
                    </div>

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
                    onClick={handleVerifyOtp}
                    className="w-full"
                    variant={"outline"}
                  >
                    Sign Up
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {success && <p className="text-green-500">{success}</p>}
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
