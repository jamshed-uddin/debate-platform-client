"use client";

import { UserType } from "@/lib/definition";

import { useGetParticipantsQuery } from "@/redux/api/participantsApi";
import React from "react";
import { ParticipantListSkeleton } from "./Skeletons";

const Participants = ({ debateId }: { debateId: string }) => {
  const {
    data: participants,
    isLoading,
    error,
  } = useGetParticipantsQuery(debateId);

  if (isLoading) {
    return <ParticipantListSkeleton />;
  }

  if (error) {
    return <div className="text-sm">Failed to load participants</div>;
  }

  return (
    <div>
      <h3>Participants . {participants?.length}</h3>
      <div className="mt-4">
        {!participants?.length ? (
          <h3>No participants</h3>
        ) : (
          <div>
            {participants?.map((indv) => (
              <div
                key={indv._id}
                className="border border-gray-300 rounded-xl p-2"
              >
                <h3 className="font-medium">
                  {(indv.userId as UserType)?.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
