import DebateForm from "@/components/DebateForm";
import { getDebate } from "@/lib/getDebate";
import React from "react";

const EditDebatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const debate = await getDebate(id);
  console.log(debate);

  return (
    <div>
      <DebateForm initialValue={debate} />
    </div>
  );
};

export default EditDebatePage;
