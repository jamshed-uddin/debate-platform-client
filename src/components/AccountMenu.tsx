"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const AccountMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"}>
          <span className="">Account</span>
          <ChevronDownIcon className={clsx("w-4 h-4")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={"/account"} className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
