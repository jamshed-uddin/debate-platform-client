"use client";

import { useForm } from "react-hook-form";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestClient } from "@/lib/requestClient";
import { signInWithemailPassword } from "@/lib/actions";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const userInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password length must be 6"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);
    try {
      const { name, email, password } = data;
      await requestClient("/users/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          provider: "credentials",
        }),
      });

      await signInWithemailPassword({ email, password });
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
      <h3 className="uppercase text-lg mb-4 font-semibold">Register</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium mb-1 block">Name</label>
          <input
            type="text"
            {...register("name")}
            className={`border rounded-md p-2 block w-full ${
              errors.name
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
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
            <span className="text-red-500 text-xs">{errors.email.message}</span>
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
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            Register
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm">
        <h3>
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-500">
            Login here
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default RegisterForm;
