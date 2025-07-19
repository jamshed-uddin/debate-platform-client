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

export function MobileMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"}>
          <span className="">Menu</span>
          <ChevronDownIcon className={clsx("w-4 h-4")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="">
          <Link href={"/create-debate"} className="w-full">
            Create debate
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <Link href={"/debates"} className="w-full">
            Debates
          </Link>
        </DropdownMenuItem>
        {isAuthenticated ? (
          <>
            <DropdownMenuItem>
              <Link href={"/settings"} className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="">
            <Link href={"/login"} className="w-full">
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
