"use client";

import React from "react";
import ArgumentInputBox from "./ArgumentInputBox";
import { DebateType } from "@/lib/definition";
import { useGetArgumentQuery } from "@/redux/api/argumentApi";
import ArgumentCard from "./ArgumentCard";
import { ArgumentListSkeleton } from "./Skeletons";

const Arguments = ({ debate }: { debate: DebateType }) => {
  const {
    data: debateArguments,
    isLoading,
    error,
  } = useGetArgumentQuery(debate?._id);

  if (isLoading) {
    return <ArgumentListSkeleton />;
  }

  if (error) {
    return <h3>Failed to load arguments</h3>;
  }

  return (
    <div className="space-y-6">
      <ArgumentInputBox debate={debate} haveCancelButton={false} />

      {!debateArguments?.length ? (
        <div>Be the first to post argument</div>
      ) : (
        <div className="space-y-4">
          {debateArguments?.map((debateArg) => (
            <ArgumentCard
              argument={debateArg}
              key={debateArg._id}
              debate={debate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Arguments;
