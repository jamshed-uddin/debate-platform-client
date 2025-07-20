import { auth } from "@/auth";
import ArgumentsAndParticipants from "@/components/ArgumentParticipants";
import DurationTimer from "@/components/DurationTimer";
import EditOrDeleteDebate from "@/components/EditOrDeleteDebate";
import ImageComponent from "@/components/ImageComponent";
import JoinLeaveMenu from "@/components/JoinLeaveMenu";

import { getDebate } from "@/lib/getDebate";
import { remainingDebateTime } from "@/lib/timeUtilities";
import { TrophyIcon } from "@heroicons/react/24/outline";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const debate = await getDebate(id);

  return {
    title: `${debate?.title} - Open Debate`,
    description: debate?.description,
  };
}

const DebateDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  const { id } = await params;
  const debate = await getDebate(id);

  return (
    <div className="mb-10">
      {/* banner image */}
      <div className="h-96 w-full rounded-xl overflow-hidden my-2 relative">
        <ImageComponent
          src={debate?.banner}
          alt={debate?.title}
          height={200}
          width={600}
        />
      </div>

      {/* duration, join/leave, edit/delete */}
      <div className="my-3 flex flex-col lg:flex-row justify-end lg:items-center gap-4">
        <div className=" flex items-center gap-2">
          {remainingDebateTime(debate?.createdAt, debate?.duration) < 1 &&
            debate?.winner && (
              <>
                <div className="border-red-500 bg-red-100  font-medium border rounded-lg px-1 text-red-500">
                  Ended
                </div>
                <div className="flex items-center gap-1 border border-amber-500  px-2 rounded-xl">
                  <TrophyIcon className="w-5 h-5 text-amber-500 inline" />{" "}
                  <span>Winner</span> <span>-</span>
                  <span> Support{debate?.winner}</span>
                </div>
              </>
            )}
        </div>

        <div className="flex items-center  justify-between gap-2">
          {/* debate timer */}
          <DurationTimer
            durationInMili={debate?.duration}
            createdAt={debate?.createdAt}
          />
          {/* join / leave button */}
          <JoinLeaveMenu debate={debate} />
          {/* edit / delete button */}
          {session && session?.user?._id === debate?.userId && (
            <EditOrDeleteDebate debate={debate} />
          )}
        </div>
      </div>
      {/* title, description */}
      <div>
        <h3 className="text-3xl font-semibold">{debate?.title}</h3>
        <p className="mt-3 text-gray-600">{debate?.description}</p>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-5">
        {/* arguments and participants */}
        <ArgumentsAndParticipants debate={debate} />
      </div>
    </div>
  );
};

export default DebateDetailPage;
