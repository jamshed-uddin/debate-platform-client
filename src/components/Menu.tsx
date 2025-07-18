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

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"}>
          <span className="lg:hidden">Menu</span>
          <span className="hidden lg:block">Account</span>
          <ChevronDownIcon className={clsx("w-4 h-4")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="lg:hidden">
          <Link href={"/create-debates"} className="w-full">
            Create debate
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="lg:hidden">
          <Link href={"/debates"} className="w-full">
            Debates
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/settings"} className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
