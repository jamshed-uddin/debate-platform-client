"use client";
import { ArgumentType } from "@/lib/definition";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useAddVoteMutation, useRemoveVoteMutation } from "@/redux/api/voteApi";
import toast from "react-hot-toast";

const VoteArgument = ({ argument }: { argument: ArgumentType }) => {
  const session = useSession();
  const userId = session?.data?.user?._id;
  console.log(userId);

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
        const res = await removeVote(argument._id);

        console.log(res);
      } else {
        // not voted. -- add vote
        const res = await addVote({
          argumentId: argument?._id,
          debateId: argument?.debateId,
        });

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session?.status == "loading") {
    return (
      <div className="h-7 w-12 bg-gray-200 rounded-lg mt-4 animate-pulse"></div>
    );
  }

  return (
    <div className="mt-4">
      <Button
        onClick={handleVote}
        variant={"secondary"}
        size={"sm"}
        className={clsx(
          "font-normal",
          userId && argument?.votes.includes(userId) ? "text-blue-600" : ""
        )}
        disabled={addVoteLoading || removeVoteLoading}
      >
        <ChevronDoubleUpIcon className="w-4 h-4 inline" /> {argument.voteCount}
      </Button>
    </div>
  );
};

export default React.memo(VoteArgument);
