"use client";

import { debateCategories, DebateType } from "@/lib/definition";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateDebateMutation,
  useUpdateDebateMutation,
} from "@/redux/api/debateApi";
import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
const debateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  banner: z.string({ error: "Enter a valid url" }).optional(),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  tags: z.string().optional(),
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

    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DebateFormData>({
    resolver: zodResolver(debateSchema),
  });
  const onSubmit = async (data: DebateFormData) => {
    try {
      if (initialValue) {
        // update debate

        const updateRes = await updateDebate({
          ...data,
          tags:
            typeof data.tags === "string"
              ? data.tags.split(",").map((t) => t.trim())
              : data.tags,
        }).unwrap();
        reset();
        router.replace(`/debates/${updateRes?._id}`);
        console.log(updateRes);
      } else {
        // create debate

        const res = await createDebate({
          ...data,
          tags:
            typeof data.tags === "string"
              ? data.tags.split(",").map((t) => t.trim())
              : data.tags,
        }).unwrap();
        reset();
        router.replace(`/debates/${res?._id}`);
        console.log(res);
      }
    } catch {
      setError(
        initialValue ? "Failed to update debate" : "Failed to create debate"
      );
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
            placeholder="e.g. Should Social Media Be Regulated by Governments?"
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
            placeholder="e.g. Explore the balance between free speech and misinformation. Should governments step in to regulate platforms?"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Banner</label>
          {
            <div className="h-96 w-full rounded-xl overflow-hidden my-2 relative">
              <Image
                src={
                  "https://i0.wp.com/newspack-coloradosun.s3.amazonaws.com/wp-content/uploads/2022/10/e22-debate.png?%2C600&quality=100&ssl=1"
                }
                alt="Debate banner"
                height={200}
                width={600}
                className="h-full w-full object-cover object-top rounded-xl"
              />

              <Button
                type="button"
                onClick={() =>
                  setValue(
                    "banner",
                    "https://i0.wp.com/newspack-coloradosun.s3.amazonaws.com/wp-content/uploads/2022/10/e22-debate.png?%2C600&quality=100&ssl=1"
                  )
                }
                className="absolute -translate-x-1/2 left-1/2 bottom-5 "
                size={"sm"}
                variant={"secondary"}
              >
                Use this image
              </Button>
            </div>
          }
          <input
            type="text"
            {...register("banner")}
            className={`border rounded-md p-2 block w-full ${
              errors.banner
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
            placeholder="Image url"
            defaultValue={initialValue?.banner}
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
        <div>
          <label className="text-sm font-medium mb-1 block">Tags</label>
          <input
            type="text"
            {...register("tags")}
            className={`border rounded-md p-2 block w-full ${
              errors.tags
                ? "border-red-500 focus:outline-red-500"
                : "border-black focus:outline-indigo-500"
            }`}
            placeholder="e.g. Ethics, Morality, FreeSpeech, Censorship, Privacy, Freedom, Democracy"
          />
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
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
