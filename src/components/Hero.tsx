import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import FadeAnimation from "./FadeAnimation";

const Hero = () => {
  return (
    <div className="h-[70vh] flex items-center ">
      <div className="">
        <FadeAnimation delay={0.1}>
          <h1 className="text-5xl lg:text-6xl font-bold">Open Debate:</h1>
        </FadeAnimation>
        <FadeAnimation delay={0.2}>
          <h1 className="text-5xl lg:text-6xl font-bold">
            Space for thoughtful disagreement
          </h1>
        </FadeAnimation>

        <FadeAnimation delay={0.3}>
          <Link href={"/debates"} className="text-xl mt-7 block underline">
            Get started <ArrowUpRightIcon className="w-4 h-4 inline" />
          </Link>
        </FadeAnimation>
      </div>
    </div>
  );
};

export default Hero;
