import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React from "react";
import DebateList from "./DebateList";

const HomePageDebates = async () => {
  const debates = await requestClient<DebateType[]>("/debates", {
    method: "GET",
  });

  return (
    <div>
      <DebateList debates={debates?.slice(0, 6)} />
    </div>
  );
};

export default HomePageDebates;
