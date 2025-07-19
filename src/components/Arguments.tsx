import { requestClient } from "@/lib/requestClient";
import React from "react";
import ArgumentInputBox from "./ArgumentInputBox";
import { ArgumentType } from "@/lib/definition";

const Arguments = async ({ debateId }: { debateId: string }) => {
  const debateArguments = await requestClient<ArgumentType[]>(
    `/arguments?debateId=${debateId}`,
    { method: "GET" }
  );

  console.log(debateArguments);
  return (
    <div>
      <ArgumentInputBox />

      {!debateArguments.length ? (
        <div>Be the first to post argument</div>
      ) : (
        debateArguments.map((debateArg) => <div key={debateArg._id}>hello</div>)
      )}
    </div>
  );
};

export default Arguments;
