import DebateList from "@/components/DebateList";
import DebateSearchAndFilter from "@/components/DebateSearchAndFilter";
import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Debates - Open Debate",
  description: "Space for thoughtful disagreement",
};
const DebatesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string; status: string; category: string }>;
}) => {
  const urlParams = await searchParams;

  const params = new URLSearchParams(urlParams);

  const debates = await requestClient<DebateType[]>(`/debates?${params}`, {
    method: "GET",
  });

  return (
    <div>
      <div className="mb-5">
        <DebateSearchAndFilter />
      </div>
      <DebateList debates={debates} />
    </div>
  );
};

export default DebatesPage;
