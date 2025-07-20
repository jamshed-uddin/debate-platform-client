import ScoreBoardFilter from "@/components/ScoreBoardFilter";
import ScoreList from "@/components/ScoreList";
import { ScorerType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React, { Suspense } from "react";

const ScoreBoardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const urlParams = await searchParams;

  const params = new URLSearchParams(urlParams);

  const url = params ? `/votes/scoreboard?${params}` : `/votes/scoreboard`;

  console.log(url);

  const scoreBoard = await requestClient<ScorerType[]>(url, {
    method: "GET",
  });

  console.log(scoreBoard);

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
