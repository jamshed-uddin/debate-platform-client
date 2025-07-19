import ArgumentParticipants from "@/components/ArgumentParticipants";
import Arguments from "@/components/Arguments";
import JoinLeaveMenu from "@/components/JoinLeaveMenu";
import Participants from "@/components/Participants";
import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import Image from "next/image";
import React from "react";

const getDebate = async (id: string) => {
  const debate = await requestClient<DebateType>(`/debates/${id}`, {
    method: "GET",
  });

  return debate;
};

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
  const { id } = await params;
  const debate = await getDebate(id);
  console.log(debate);
  return (
    <div>
      <div>
        <Image src={debate?.banner} alt={debate?.title} />
      </div>
      <div>
        <JoinLeaveMenu debate={debate} />
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
