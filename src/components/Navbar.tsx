import Link from "next/link";
import React from "react";
import { MobileMenu } from "./MobileMenu";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import AccountMenu from "./AccountMenu";
import { cn } from "@/lib/utils";
import { TrophyIcon } from "@heroicons/react/24/solid";

const Navbar = async ({ className }: { className?: string }) => {
  const session = await auth();

  return (
    <nav className={cn("py-3", className)}>
      <ul className="flex gap-5 items-center">
        <li className="flex-1">
          <Link href={"/"} className="text-xl font-bold">
            {" "}
            Open Debate
          </Link>
        </li>
        <ul className="hidden lg:flex gap-5 items-center ">
          <li>
            <Link href={"/debates"}>Debates</Link>
          </li>
          <li>
            <Link href={"/create-debate"}>Create Debate</Link>
          </li>
        </ul>
        <li>
          <Link href={"/score-board"}>
            <TrophyIcon className="w-5 h-5 text-amber-400 " />
          </Link>
        </li>
        <div className="hidden lg:block">
          {session ? (
            <AccountMenu />
          ) : (
            <Button className="p-0" size={"sm"}>
              <Link
                href={"/login"}
                className="h-full w-full border px-3 flex items-center"
              >
                Login
              </Link>
            </Button>
          )}
        </div>
        <div className="lg:hidden">
          <MobileMenu isAuthenticated={!!session?.user} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
