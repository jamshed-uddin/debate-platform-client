"use client";

import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithemailPassword } from "@/lib/actions";

type FormData = {
  email: string;
  password: string;
};

const credentialSchema = z.object({
  email: z.email("Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password length must be 6"),
});

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(credentialSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);
    const { email, password } = data;
    try {
      const res = await signInWithemailPassword({ email, password });

      if (res.error) {
        return setError(res.message);
      }
      reset();
      router.replace(searchParams.get("callbackUrl") || "/");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-1/4 w-[95%]">
      <h3 className="uppercase text-lg mb-4 font-semibold">Login</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input
            type="text"
            {...register("email")}
            className={`border rounded-md p-2 block w-full ${
              errors.email
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="flex justify-between items-center text-sm font-medium mb-1">
            <span>Password</span>
            <span
              onClick={() => setShowPassword((p) => !p)}
              className="cursor-pointer opacity-70"
              role="button"
            >
              {showPassword ? (
                <EyeIcon className="w-4 h-4" />
              ) : (
                <EyeSlashIcon className="w-4 h-4" />
              )}
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`border rounded-md p-2 block w-full ${
              errors.password
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm">
        <h3>
          Don&apos;t have an account?{" "}
          <Link
            href={`${
              "/register" +
              (searchParams.toString() ? `?${searchParams.toString()}` : "")
            }`}
            className="underline text-blue-500"
          >
            Register here
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default LoginForm;
