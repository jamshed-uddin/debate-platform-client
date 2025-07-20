"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ScoreBoardFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParams = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }

    router.replace(`/score-board?${params.toString()}`);
  };

  return (
    <div className="mb-3 flex justify-end">
      <div>
        <select
          onChange={(e) => setParams(e.target.value)}
          name=""
          id=""
          defaultValue={searchParams.get("filter")?.toString()}
          className={`border rounded-md px-2 py-1 w-fit   border-black focus:outline-indigo-500`}
        >
          <option value="">All time</option>
          <option value="weakly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
};

export default ScoreBoardFilter;
