import ScoreList from "@/components/ScoreList";
import { ScorerType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React from "react";

const ScoreBoardPage = async () => {
  const scoreBoard = await requestClient<ScorerType[]>("/votes/scoreboard", {
    method: "GET",
  });

  console.log(scoreBoard);

  return (
    <div>
      <ScoreList scorer={scoreBoard} />
    </div>
  );
};

export default ScoreBoardPage;
