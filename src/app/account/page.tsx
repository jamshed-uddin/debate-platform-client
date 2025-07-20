import { auth } from "@/auth";
import DebateList from "@/components/DebateList";
import { DebateType } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account - Open Debate",
  description: "Space for thoughtful disagreement",
};

const AccontPage = async () => {
  const session = await auth();

  const myDebates = await requestClient<DebateType[]>(
    `/debates?userId=${session?.user?._id}`,
    { method: "GET" }
  );

  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Welcome, {session?.user?.name}</h3>
      </div>

      <div className="mt-8">
        <h3 className="border-b border-gray-300 pb-3 ">Debates</h3>

        <div className="mt-4">
          <DebateList debates={myDebates} />
        </div>
      </div>
    </div>
  );
};

export default AccontPage;
