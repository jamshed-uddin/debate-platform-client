import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { DebateType } from "@/lib/definition";

import Link from "next/link";
import { remainingDebateTime } from "@/lib/timeUtilities";
import ImageComponent from "./ImageComponent";

const DebateCard = ({ debate }: { debate: DebateType }) => {
  return (
    <Link href={`/debates/${debate._id}`}>
      <Card className="pt-0 overflow-hidden">
        <CardHeader className="relative px-0 ">
          <div className="absolute top-2 right-2 text-xs   px-2">
            {remainingDebateTime(debate?.createdAt, debate?.duration) < 1 ? (
              <div className="border-red-500 bg-red-200 rounded-xl px-1.5">
                Ended
              </div>
            ) : (
              <div className="bg-black text-white rounded-xl px-1.5">
                On going
              </div>
            )}
          </div>
          <div className="h-40 w-full overflow-hidden">
            <ImageComponent
              src={debate.banner}
              alt={debate.title}
              height={300}
              width={400}
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
