import { DebateType } from "@/lib/definition";
import React from "react";
import DebateCard from "./DebateCard";

const DebateList = ({ debates }: { debates: DebateType[] }) => {
  return (
    <div>
      {!debates?.length ? (
        <div>No debate found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {debates?.map((debate) => (
            <DebateCard key={debate._id} debate={debate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DebateList;
