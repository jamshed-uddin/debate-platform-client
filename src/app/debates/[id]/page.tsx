import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
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
  return <div>{id}</div>;
};

export default DebateDetailPage;
