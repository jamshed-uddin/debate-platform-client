import { ArgumentType } from "@/lib/definition";
import React from "react";
import VoteArgument from "./VoteArgument";
import clsx from "clsx";

const ArgumentCard = ({ argument }: { argument: ArgumentType }) => {
  return (
    <div className="border border-gray-300 rounded-md p-2">
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
      <p>{argument.content}</p>
      <VoteArgument argument={argument} />
    </div>
  );
};

export default ArgumentCard;
