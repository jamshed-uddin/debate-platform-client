import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { DebateType } from "@/lib/definition";
import Image from "next/image";

import Link from "next/link";
import { remainingDebateTime } from "@/lib/timeUtilities";

const DebateCard = ({ debate }: { debate: DebateType }) => {
  return (
    <Link href={`/debates/${debate._id}`}>
      <Card className="pt-0 overflow-hidden">
        <CardHeader className="relative px-0 ">
          <div className="absolute top-2 right-2 text-xs bg-black text-white rounded-xl px-2">
            {remainingDebateTime(debate?.createdAt, debate?.duration) < 1 ? (
              <div>Ended</div>
            ) : (
              <div>On going</div>
            )}
          </div>
          <div className="h-40 w-full overflow-hidden">
            <Image
              src={debate.banner}
              alt={debate.title}
              height={300}
              width={400}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </CardHeader>
        <CardFooter className="px-3">
          <h3 className="font-semibold">{debate.title}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DebateCard;
