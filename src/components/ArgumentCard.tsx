"use client";

import { ArgumentType } from "@/lib/definition";
import React, { useState } from "react";
import VoteArgument from "./VoteArgument";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Button } from "@headlessui/react";
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useTimer } from "react-timer-hook";

const ArgumentCard = ({ argument }: { argument: ArgumentType }) => {
  const [edit, setEdit] = useState(false);
  const session = useSession();
  const createdAt = new Date(argument?.createdAt);
  const expiryTimestamp = new Date(createdAt.getTime() + 5 * 60 * 1000);
  const fiveMinsExceeded = createdAt.getTime() + 5 * 60 * 1000 < Date.now();
  const { minutes, seconds } = useTimer({ expiryTimestamp });
  console.log(fiveMinsExceeded);
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
            <div
              className={clsx(
                "text-sm px-2 flex items-center gap-1",
                fiveMinsExceeded ? "text-red-500" : ""
              )}
            >
              <ClockIcon className="w-4 h-4 inline" />
              <div>
                <span>{minutes}</span> : <span>{seconds}</span>
              </div>
            </div>
            <div className="space-x-4 px-2">
              <Button
                onClick={() => console.log("clickkkk")}
                disabled={fiveMinsExceeded}
              >
                <PencilSquareIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => console.log("clickkkk")}
                disabled={fiveMinsExceeded}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <p>{argument.content}</p>
      <VoteArgument argument={argument} />
    </div>
  );
};

export default ArgumentCard;
