import Link from "next/link";
import React from "react";
import { Menu } from "./Menu";
import { auth } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="py-3 ">
      <ul className="flex gap-5 items-center">
        <li className="flex-1">
          <Link href={"/"} className="text-xl font-bold">
            {" "}
            Open Debate
          </Link>
        </li>
        <ul className="hidden lg:flex gap-5 items-center ">
          <li>Create Debate</li>
          <li>Debates</li>
        </ul>
        {session?.user ? (
          <Menu />
        ) : (
          <Button size={"sm"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
