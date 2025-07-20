"use client";

import { ArgumentType, DebateType } from "@/lib/definition";
import React, { useState } from "react";
import VoteArgument from "./VoteArgument";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Button } from "@headlessui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useDeleteArgumentMutation } from "@/redux/api/argumentApi";
import DurationTimer from "./DurationTimer";
import { formatTimestamps } from "@/lib/timeUtilities";
import ArgumentInputBox from "./ArgumentInputBox";

const ArgumentCard = ({
  argument,
  debate,
}: {
  argument: ArgumentType;
  debate: DebateType;
}) => {
  const [edit, setEdit] = useState(false);
  const session = useSession();
  const [deleteArgument, { isLoading }] = useDeleteArgumentMutation();

  // time for edit delete expire check
  const createdAt = new Date(argument?.createdAt);

  const fiveMinsExceeded = createdAt.getTime() + 5 * 60 * 1000 < Date.now();
  // min and sec to show timer

  //delete argument
  const deleteArgumentHandler = async () => {
    try {
      await deleteArgument(argument?._id).unwrap();
      toast.success("Argument deleted");
    } catch {
      toast.error("Failed to delete argument");
    }
  };
  if (edit) {
    return (
      <ArgumentInputBox
        debate={debate}
        initialArgument={argument}
        haveCancelButton={true}
        onCancel={() => setEdit(false)}
        onSubmitSuccess={() => setEdit(false)}
      />
    );
  }
  return (
    <div className="border border-gray-300 rounded-md p-2">
      <div className="flex  justify-between ">
        <h3 className="font-medium mb-1">
          {argument.userName || "[Participant]"}{" "}
          <span
            className={clsx(
              "text-xs font-normal border rounded-lg px-1",
              argument?.user?.side === "Support" &&
                "border-green-500 bg-green-200 ",
              argument?.user?.side === "Oppose" && "border-red-500 bg-red-200"
            )}
          >
            {argument?.user?.side}
          </span>
        </h3>
        {argument.userId === session?.data?.user?._id && (
          <div className="flex  items-center rounded-lg bg-gray-100 divide-x-2 ">
            <DurationTimer
              createdAt={argument?.createdAt}
              durationInMili={5 * 60 * 1000}
            />
            <div className="space-x-4 px-2">
              <Button disabled={fiveMinsExceeded} onClick={() => setEdit(true)}>
                <PencilSquareIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={deleteArgumentHandler}
                disabled={isLoading || fiveMinsExceeded}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <p>{argument.content}</p>
      <div className="flex justify-between items-end mt-4">
        <VoteArgument argument={argument} debate={debate} />

        <div className="text-xs text-gray-500">
          {formatTimestamps(argument?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ArgumentCard;
