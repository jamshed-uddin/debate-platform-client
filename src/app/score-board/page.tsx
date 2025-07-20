import ScoreBoardFilter from "@/components/ScoreBoardFilter";
import ScoreList from "@/components/ScoreList";
import { ScorerType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Scoreboard - Open Debate",
  description: "Space for thoughtful disagreement",
};

const ScoreBoardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const urlParams = await searchParams;

  const params = new URLSearchParams(urlParams);

  const scoreBoard = await requestClient<ScorerType[]>(
    `/votes/scoreboard?${params}`,
    {
      method: "GET",
    }
  );

  return (
    <div>
      <Suspense>
        <ScoreBoardFilter />
      </Suspense>
      <ScoreList scorer={scoreBoard} />
    </div>
  );
};

export default ScoreBoardPage;
