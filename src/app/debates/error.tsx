"use client";

import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button
        onClick={reset}
        className="flex items-center gap-1 mt-4"
        variant={"secondary"}
        size={"sm"}
      >
        <span>Refresh</span> <ArrowPathIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Error;
