"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signInWithemailPassword = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", { ...credentials, redirect: false });

    return {
      success: true,
      error: false,
      message: "Signin successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: true,
        message:
          (error as AuthError).cause?.err?.message || "Something went wrong",
      };
    }
    return {
      success: false,
      error: true,
      message: "Something went wrong",
    };
  }
};

export const userSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
