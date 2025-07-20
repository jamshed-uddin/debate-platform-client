"use client";
import { ArgumentType } from "@/lib/definition";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";

const VoteArgument = ({ argument }: { argument: ArgumentType }) => {
  const session = useSession();
  const userId = session?.data?.user?._id;
  console.log(userId);

  return (
    <div className="mt-4">
      <Button
        variant={"secondary"}
        size={"sm"}
        className={clsx(
          "font-normal",
          argument?.votes.includes(userId) ? "text-blue-600" : ""
        )}
      >
        <ChevronDoubleUpIcon className="w-4 h-4 inline" /> {argument.voteCount}
      </Button>
    </div>
  );
};

export default VoteArgument;
