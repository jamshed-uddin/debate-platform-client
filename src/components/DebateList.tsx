import { DebateType } from "@/lib/definition";
import React from "react";
import DebateCard from "./DebateCard";
import FadeAnimation from "./FadeAnimation";

const DebateList = ({ debates }: { debates: DebateType[] }) => {
  return (
    <div>
      {!debates?.length ? (
        <div>No debate found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {debates?.map((debate, idx) => (
            <FadeAnimation key={debate._id} delay={idx * 0.2}>
              <DebateCard debate={debate} />
            </FadeAnimation>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebateList;
