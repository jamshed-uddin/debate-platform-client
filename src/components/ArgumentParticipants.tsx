import React from "react";
import Arguments from "./Arguments";
import Participants from "./Participants";
import { DebateType } from "@/lib/definition";

const ArgumentParticipants = ({ debate }: { debate: DebateType }) => {
  return (
    <div className="flex gap-4">
      <div className=" rounded-xl  flex-1">
        <Arguments debateId={debate?._id} />
      </div>
      <div className=" rounded-xl  w-full lg:w-1/3">
        <Participants debateId={debate?._id} />
      </div>
    </div>
  );
};

export default ArgumentParticipants;
