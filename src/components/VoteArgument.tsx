"use client";
import { ArgumentType, DebateType } from "@/lib/definition";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useAddVoteMutation, useRemoveVoteMutation } from "@/redux/api/voteApi";
import toast from "react-hot-toast";
import { remainingDebateTime } from "@/lib/timeUtilities";

const VoteArgument = ({
  argument,
  debate,
}: {
  argument: ArgumentType;
  debate: DebateType;
}) => {
  const session = useSession();
  const userId = session?.data?.user?._id;

  const [addVote, { isLoading: addVoteLoading }] = useAddVoteMutation();
  const [removeVote, { isLoading: removeVoteLoading }] =
    useRemoveVoteMutation();

  const handleVote = async () => {
    if (!session.data) {
      return toast.error("Login to vote argument");
    }

    try {
      if (userId && argument?.votes.includes(userId)) {
        // voted. -- remove vote
        await removeVote(argument._id);
      } else {
        // not voted. -- add vote
        await addVote({
          argumentId: argument?._id,
          debateId: argument?.debateId,
        });
      }
    } catch {
      if (userId && argument?.votes.includes(userId)) {
        toast.error("Failed to remove vote");
      } else {
        toast.error("Failed to add vote");
      }
    }
  };

  if (session?.status == "loading") {
    return (
      <div className="h-7 w-12 bg-gray-200 rounded-lg mt-4 animate-pulse"></div>
    );
  }

  return (
    <div>
      <Button
        onClick={handleVote}
        variant={"secondary"}
        size={"sm"}
        className={clsx(
          "font-normal",
          userId && argument?.votes.includes(userId) ? "text-blue-600" : ""
        )}
        disabled={
          addVoteLoading ||
          removeVoteLoading ||
          remainingDebateTime(debate?.createdAt, debate?.duration) < 1
        }
      >
        <ChevronDoubleUpIcon className="w-4 h-4 inline" /> {argument.voteCount}
      </Button>
    </div>
  );
};

export default React.memo(VoteArgument);
