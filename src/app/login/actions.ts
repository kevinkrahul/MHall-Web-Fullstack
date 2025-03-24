"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "Invalid credentials or user not found "};
  }

  revalidatePath("/login", "layout");
  redirect("/admin");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if(!data.password){
    return { error: "Password is required" };
  }
  revalidatePath("/signup/new/verify-otp", "layout");
  const { error } = await supabase.auth.signUp(data);
  if(!error){
    return {success:"OTP sent Successfully"};
  }  
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email:formData.get("email") as string,
    otp:formData.get("otp") as string,
  }
    const { error } = await supabase.auth.verifyOtp({
      email: data.email,
      token: data.otp,
      type: "email",
    });

    if(error){
      return { error: "Invalid OTP"};
    }
    revalidatePath("/signup/new/verify-otp", "layout");
    redirect("/login");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const token = formData.get("otp") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!newPassword) {
    return { error: "New password is required" };
  }
  

  const { error } = await supabase.auth.verifyOtp({
    type: "recovery",
    token,
    email: formData.get("email") as string,
  });
  if (error) {
    return { error: "Invalid OTP or expired link" };
  }
  // Update the password
  const { error: passwordError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (passwordError) {
    return { error: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)" };
  }

  return { success: "Password updated successfully! You can now log in." };
}

export async function forgetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  // Send reset email with a redirect to the reset-password page
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    return { error: "Failed to send password reset email" };
  }

  return { success: "Check your email for the reset link." };
}
