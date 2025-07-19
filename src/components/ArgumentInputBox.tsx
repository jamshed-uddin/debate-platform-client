"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArgumentType } from "@/lib/definition";

const ArgumentInputBox = ({
  initialArgument,
}: {
  initialArgument?: ArgumentType;
}) => {
  return (
    <div>
      <textarea
        rows={3}
        className={`border rounded-md p-2 block w-full resize-none border-black focus:outline-indigo-500`}
      />
      <div className="flex justify-end gap-3 mt-2">
        <Button variant={"outline"} size={"sm"}>
          Cancel
        </Button>
        <Button size={"sm"}>Post</Button>
      </div>
    </div>
  );
};

export default ArgumentInputBox;
