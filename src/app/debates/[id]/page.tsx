import { auth } from "@/auth";
import ArgumentParticipants from "@/components/ArgumentParticipants";
import EditOrDeleteDebate from "@/components/EditOrDeleteDebate";
import ImageComponent from "@/components/ImageComponent";

import JoinLeaveMenu from "@/components/JoinLeaveMenu";

import { DebateType } from "@/lib/definition";
import { getDebate } from "@/lib/getDebate";
import { requestClient } from "@/lib/requestClient";
import { remainingDebateTime } from "@/lib/timeUtilities";
import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
      <div className="h-96 w-full rounded-xl overflow-hidden my-2 relative">
        <ImageComponent
          src={debate?.banner}
          alt={debate?.title}
          height={200}
          width={600}
        />
      </div>
      <div className="my-3 flex justify-end gap-4">
        <div
          className={clsx(
            "flex items-center gap-2",

            remainingDebateTime(debate?.createdAt, debate?.duration) < 1 &&
              "text-red-500"
          )}
        >
          <ClockIcon className="w-4 h-4 " />{" "}
          <span>
            {remainingDebateTime(debate?.createdAt, debate?.duration)} /{" "}
            {debate?.duration / 3600000}{" "}
            <span>{debate?.duration / 3600000 > 1 ? "hrs" : "hr"}</span>
          </span>
        </div>
        <JoinLeaveMenu debate={debate} />
        {session && session?.user?._id === debate?.userId && (
          <EditOrDeleteDebate debate={debate} />
        )}
      </div>
      {/* title, description */}
      <div>
        <h3 className="text-3xl font-semibold">{debate?.title}</h3>
        <p className="mt-3 text-gray-600">{debate?.description}</p>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-5">
        {/* arguments and participants */}
        <ArgumentParticipants debate={debate} />
      </div>
    </div>
  );
};

export default DebateDetailPage;
