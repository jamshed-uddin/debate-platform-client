"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArgumentType, DebateType } from "@/lib/definition";
import { usePostArgumentMutation } from "@/redux/api/argumentApi";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasJoinedDebate } from "@/lib/hasJoinedDebate";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type FormData = {
  content: string;
};

const contentSchema = z.object({
  content: z.string().min(1, "Password is required"),
});
const ArgumentInputBox = ({
  debate,
  initialArgument,
  haveCancelButton,
  onCancel,
  onSubmitSuccess,
}: {
  debate: DebateType;
  initialArgument?: ArgumentType;
  haveCancelButton?: boolean;
  onCancel?: () => void;
  onSubmitSuccess?: () => void;
}) => {
  const session = useSession();

  const [postArgument, { isLoading, error: postArgumentError }] =
    usePostArgumentMutation({});

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contentSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (session.status === "unauthenticated") {
        return toast.error("Login to post argument");
      }

      if (
        session.status === "authenticated" &&
        hasJoinedDebate(debate?.participants, session?.data?.user?._id)
      ) {
        return toast.error("Join debate to post argument");
      }
      await postArgument({
        debateId: debate?._id,
        content: data.content,
      }).unwrap();
      onSubmitSuccess?.();
      reset();
    } catch {
      toast.error("Failed to post argument");
    }
  };

  console.log(postArgumentError);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("content")}
        rows={3}
        className={`border rounded-md p-2 block w-full ${
          errors.content
            ? "border-red-500 focus:outline-red-500"
            : "border-black focus:outline-indigo-500"
        }`}
        defaultValue={initialArgument?.content}
      />
      {errors.content && (
        <span className="text-red-500 text-sm">{errors.content.message}</span>
      )}
      {postArgumentError && (
        <span className="text-sm text-red-500">Failed to post argument</span>
      )}
      <div className="flex justify-end gap-3 mt-2">
        {haveCancelButton && (
          <Button
            onClick={onCancel}
            type="button"
            variant={"outline"}
            size={"sm"}
          >
            Cancel
          </Button>
        )}
        <Button disabled={isLoading} type="submit" size={"sm"}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default ArgumentInputBox;
