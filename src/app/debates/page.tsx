import DebateList from "@/components/DebateList";
import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Debates - Open Debate",
  description: "Space for thoughtful disagreement",
};
const DebatesPage = async () => {
  const debates = await requestClient<DebateType[]>("/debates", {
    method: "GET",
  });

  return (
    <div>
      <DebateList debates={debates} />
    </div>
  );
};

export default DebatesPage;
