"use client";

import { debateCategories, DebateType } from "@/lib/definition";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  useCreateDebateMutation,
  useUpdateDebateMutation,
} from "@/redux/api/debateApi";
import { useRouter } from "next/navigation";
const debateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  banner: z.string({ error: "Enter a valid url" }).optional(),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  tags: z.array(z.string()).optional(),
});

export type DebateFormData = z.infer<typeof debateSchema>;

const DebateForm = ({ initialValue }: { initialValue?: DebateType }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [createDebate, { isLoading: createDebateLoading }] =
    useCreateDebateMutation();
  const [updateDebate, { isLoading: updateDebateLoading }] =
    useUpdateDebateMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DebateFormData>({
    resolver: zodResolver(debateSchema),
  });

  const onSubmit = async (data: DebateFormData) => {
    try {
      if (initialValue) {
        const updateRes = await updateDebate(data).unwrap();
        reset();
        router.replace(`/debates/${updateRes?._id}`);
        console.log(updateRes);
      } else {
        console.log("hit");
        const res = await createDebate(data).unwrap();
        reset();
        router.replace(`/debates/${res?._id}`);
        console.log(res);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

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
          <textarea
            {...register("description")}
            rows={3}
            className={`border rounded-md p-2 block w-full resize-none ${
              errors.description
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Banner Url</label>
          <input
            type="text"
            {...register("banner")}
            className={`border rounded-md p-2 block w-full ${
              errors.banner
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
          />
          {errors.banner && (
            <span className="text-red-500 text-sm">
              {errors.banner.message}
            </span>
          )}
        </div>

        <div className="lg:flex lg:gap-4 items-start  justify-between">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select
              {...register("category")}
              className={`border rounded-md p-2 w-full   ${
                errors.category
                  ? "border-red-500 focus:outline-red-500"
                  : "border-black focus:outline-indigo-500"
              }`}
            >
              <option value="">Category</option>
              {debateCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Duration</label>
            <select
              {...register("duration")}
              className={`border rounded-md p-2 w-full   ${
                errors.duration
                  ? "border-red-500 focus:outline-red-500"
                  : "border-black focus:outline-indigo-500"
              }`}
            >
              <option value="">Duration</option>
              {[1, 2, 3, 5, 7, 12, 24, 48, 72].map((time) => (
                <option key={time} value={String(time * 60 * 60 * 1000)}>
                  {time > 1 ? time + " hours" : time + " hour"}
                </option>
              ))}
            </select>
            {errors.duration && (
              <span className="text-red-500 text-sm">
                {errors.duration.message}
              </span>
            )}
          </div>
        </div>

        {error && (
          <span className="block mb-2 text-red-500 text-sm">{error}</span>
        )}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={createDebateLoading || updateDebateLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DebateForm;
