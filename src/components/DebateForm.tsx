"use client";

import { DebateType } from "@/lib/definition";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

const DebateForm = ({ initialValue }: { initialValue?: DebateType }) => {
  const [error, setError] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<DebateType>>();

  const onSubmit = async () => {};

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <input
            type="text"
            {...register("title")}
            className={`border rounded-md p-2 block w-full ${
              errors.title
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <input
            type="text"
            {...register("title")}
            className={`border rounded-md p-2 block w-full ${
              errors.title
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <input
            type="text"
            {...register("title")}
            className={`border rounded-md p-2 block w-full ${
              errors.title
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default DebateForm;
