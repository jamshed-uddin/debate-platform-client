import { DebateType } from "@/lib/definition";
import React from "react";

const DebateList = ({ debates }: { debates: DebateType[] }) => {
  return (
    <div>
      {!debates?.length ? (
        <div>No debate found</div>
      ) : (
        <div>
          {debates?.map((debate) => (
            <div key={debate._id}>
              <h3>{debate.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebateList;
