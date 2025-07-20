import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-10">
      <ul className="flex lg:flex-row flex-col lg:items-center justify-between ">
        <li className="text-lg font-semibold">Open Debate</li>
        <li>
          <Link href={"/debates"}>Debates</Link>
        </li>
        <li className="text-xs text-center lg:text-start mt-3 lg:mt-0">
          © {new Date().getFullYear()} Open Debate
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
