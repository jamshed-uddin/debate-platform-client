"use client";

import React, { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { debateCategories } from "@/lib/definition";

const DebateSearchAndFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    if (!value.trim()) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.replace(`/debates?${params.toString()}`);
  };

  const onSearchBarChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      const { value } = e.target;

      if (!value.trim()) {
        params.delete("search");
      } else {
        params.set("search", value.trim());
      }

      router.replace(`/debates?${params.toString()}`);
    },
    600
  );

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("status");
    params.delete("category");

    router.replace(`/debates?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between">
      <div className="flex w-full max-w-sm items-center gap-1">
        <MagnifyingGlassIcon className="w-5 h-5 inline" />
        <input
          type="text"
          placeholder="Search agent"
          className={`border rounded-xl py-1.5 px-2 block w-full 
                border-gray-400 focus:outline-indigo-500
            `}
          onChange={onSearchBarChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          name="status"
          onChange={(e) => onFilterChange("status", e.target.value)}
          value={searchParams.get("status") || " "}
          className={`border rounded-xl px-2 py-1.5 w-fit   border-gray-400 focus:outline-indigo-500`}
        >
          <option value=" ">Status</option>
          <option value="ended">Ended</option>
          <option value="ongoing">On going</option>
        </select>

        {/* category */}
        <select
          name="category"
          onChange={(e) => onFilterChange("category", e.target.value)}
          value={searchParams.get("category") || " "}
          className={`border rounded-xl px-2 py-1.5 w-fit   border-gray-400 focus:outline-indigo-500`}
        >
          <option value=" ">Category</option>
          {debateCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <Button
          onClick={clearFilter}
          variant="outline"
          className="rounded-xl cursor-pointer border-gray-400 p-0 font-normal"
        >
          Clear <XMarkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DebateSearchAndFilter;
