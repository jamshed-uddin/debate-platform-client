"use client";

import { DebateType } from "@/lib/definition";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { hasJoinedDebate } from "@/lib/hasJoinedDebate";
import ModalClient from "./ModalClient";
import {
  useAddParticipantMutation,
  useRemoveParticipantsMutation,
} from "@/redux/api/participantsApi";

const JoinLeaveMenu = ({ debate }: { debate: DebateType }) => {
  const session = useSession();
  const [action, setAction] = useState("");
  const [addParticipant, { isLoading: addParticipantLoading }] =
    useAddParticipantMutation();
  const [removeParticipant, { isLoading }] = useRemoveParticipantsMutation();

  const closeModal = () => setAction("");

  const joinDebateHandler = async (side: "Support" | "Oppose") => {
    try {
      const res = await addParticipant({
        debateId: debate?._id,
        side,
      }).unwrap();
      closeModal();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveDebateHandler = async () => {
    try {
      const res = await removeParticipant(debate?._id).unwrap();
      console.log(res);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!!action && (
        <ModalClient
          open={!!action}
          close={closeModal}
          internalCloseButton={action === "join"}
        >
          {/* join */}
          {action === "join" ? (
            <div>
              <h3 className=" text-lg font-semibold">Choose a side</h3>
              <div className="flex justify-end items-center gap-3 mt-3">
                <Button
                  onClick={() => joinDebateHandler("Oppose")}
                  size={"sm"}
                  variant={"destructive"}
                  disabled={addParticipantLoading}
                >
                  Oppose
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-500"
                  size={"sm"}
                  onClick={() => joinDebateHandler("Support")}
                  disabled={addParticipantLoading}
                >
                  Support
                </Button>
              </div>
            </div>
          ) : (
            // leave
            <div>
              <h3 className=" text-lg font-semibold">
                Are you sure you want to leave?
              </h3>
              <div className="flex justify-end items-center gap-3 mt-3">
                <Button
                  className=""
                  variant={"destructive"}
                  size={"sm"}
                  onClick={leaveDebateHandler}
                  disabled={isLoading}
                >
                  Leave
                </Button>
                <Button
                  onClick={() => closeModal()}
                  size={"sm"}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </ModalClient>
      )}
      {/* {hasJoinedDebate(debate?.participants, session?.data?.user._id) ? ( */}
      <Button
        variant={"destructive"}
        size={"sm"}
        onClick={() => setAction("leave")}
      >
        Leave
      </Button>
      {/* ) : ( */}
      <Button size={"sm"} onClick={() => setAction("join")}>
        Join
      </Button>
      {/* )} */}
    </div>
  );
};

export default JoinLeaveMenu;
