import { ScorerType } from "@/lib/definition";
import React from "react";

const ScoreList = ({ scorer }: { scorer: ScorerType[] }) => {
  return (
    <div>
      {scorer.length < 1 ? (
        <div>No scorer found.</div>
      ) : (
        <div>
          <div className="grid grid-cols-[auto_1fr_1fr_1fr] mb-3 border-b border-gray-300 pb-2">
            <h3 className="mr-10">#</h3>
            <h3>Name</h3>
            <h3>Debates participated</h3>
            <h3>Vote gained</h3>
          </div>
          <div className="space-y-3">
            {scorer?.map((user, idx) => (
              <div
                key={user.userId}
                className="grid grid-cols-[auto_1fr_1fr_1fr] border-b border-gray-300 pb-2"
              >
                <h3 className="mr-10">{idx + 1}</h3>
                <h3>{user.name}</h3>
                <h3>{user.totalDebates}</h3>
                <h3>{user.totalVotes}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreList;
