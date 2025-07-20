import DebateForm from "@/components/DebateForm";
import { getDebate } from "@/lib/getDebate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit debate - Open Debate",
  description: "Space for thoughtful disagreement",
};

const EditDebatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const debate = await getDebate(id);

  return (
    <div>
      <DebateForm initialValue={debate} />
    </div>
  );
};

export default EditDebatePage;
