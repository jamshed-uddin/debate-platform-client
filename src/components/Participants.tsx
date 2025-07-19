"use client";

import { ParticipantType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { useGetParticipantsQuery } from "@/redux/api/participantsApi";
import React from "react";

const Participants = ({ debateId }: { debateId: string }) => {
  const {
    data: participants,
    isLoading,
    error,
  } = useGetParticipantsQuery(debateId);
  console.log(participants);
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
                className="border border-gray-400 rounded-xl p-2"
              >
                <h3 className="font-semibold">{indv.userId.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
