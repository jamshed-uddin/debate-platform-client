"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArgumentType, DebateType } from "@/lib/definition";
import {
  useEditArgumentMutation,
  usePostArgumentMutation,
} from "@/redux/api/argumentApi";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasJoinedDebate } from "@/lib/hasJoinedDebate";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { remainingDebateTime } from "@/lib/timeUtilities";

const bannedWords = [
  "stupid",
  "idiot",
  "dumb",
  "fool",
  "moron",
  "hate",
  "trash",
  "nonsense",
  "garbage",
  "ugly",
  "shut up",
  "loser",
  "jerk",
  "screw you",
  "bastard",
  "crap",
  "hell",
  "weirdo",
  "creep",
  "psycho",
  "skank",
  "nutjob",
  "shit",
  "sh1t",
  "s-h-i-t",
  "fuck",
  "f*ck",
  "fvck",
  "f@ck",
  "fucking",
  "f*cking",
  "fvcking",
  "f@cking",
  "bitch",
  "biatch",
  "b!tch",
  "b1tch",
  "asshole",
  "a$$hole",
  "dick",
  "d!ck",
  "d1ck",
  "douche",
  "piss",
  "slut",
  "sl00t",
  "retard",
  "r3tard",
  "cunt",
  "c*nt",
  "damn",
  "whore",
  "h0e",
  "suck",
  "sux",
  "motherfucker",
  "mf",
  "jackass",
  "dipshit",
  "bullshit",
  "bs",
];

type FormData = {
  content: string;
};

const contentSchema = z.object({
  content: z
    .string()
    .refine(
      (val) => {
        const valueLowerCase = val.toLowerCase();
        return !bannedWords.some((word) => valueLowerCase.includes(word));
      },
      {
        message: "Your argument contains inappropriate language.",
      }
    )
    .min(1, "Content is required"),
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

  const [postArgument, { isLoading }] = usePostArgumentMutation({});
  const [editArgument, { isLoading: editArgumentLoading }] =
    useEditArgumentMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contentSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!session?.data) {
        return toast.error("Login to post argument");
      }

      if (!hasJoinedDebate(debate?.participants, session?.data?.user?._id)) {
        return toast.error("Join debate to post argument");
      }

      if (remainingDebateTime(debate?.createdAt, debate?.duration) < 1) {
        return toast.error("Debate has ended");
      }

      const participantsSide = debate?.participants.find(
        (participant) => participant.userId === session?.data.user._id
      )?.side;

      if (!participantsSide) {
        return toast.error("Join debate to post argument");
      }

      if (initialArgument) {
        await editArgument({
          content: data.content,
          argumentId: initialArgument._id,
        }).unwrap();
        reset();
      } else {
        await postArgument({
          debateId: debate?._id,
          content: data.content,
          side: participantsSide,
        }).unwrap();

        reset();
      }
      onSubmitSuccess?.();
    } catch {
      if (initialArgument) {
        toast.error("Failed to edit argument");
      } else {
        toast.error("Failed to post argument");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("content")}
        rows={3}
        className={`border border-gray-300 rounded-md p-2 block w-full resize-none ${
          errors.content
            ? "border-red-500 focus:outline-red-500"
            : "border-black focus:outline-indigo-500"
        }`}
        placeholder="Your argument"
        defaultValue={initialArgument?.content}
      />
      {errors.content && (
        <span className="text-red-500 text-sm">{errors.content.message}</span>
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
        <Button
          disabled={
            editArgumentLoading ||
            isLoading ||
            remainingDebateTime(debate?.createdAt, debate?.duration) < 1
          }
          type="submit"
          size={"sm"}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default ArgumentInputBox;
