import React from "react";
import Arguments from "./Arguments";
import Participants from "./Participants";
import { DebateType } from "@/lib/definition";

const ArgumentsAndParticipants = ({ debate }: { debate: DebateType }) => {
  return (
    <div className="flex gap-10 lg:flex-row flex-col">
      <div className=" rounded-xl  flex-1">
        <Arguments debate={debate} />
      </div>
      <div className=" rounded-xl  w-full lg:w-1/3">
        <Participants debateId={debate?._id} />
      </div>
    </div>
  );
};

export default ArgumentsAndParticipants;
