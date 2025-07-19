import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { DebateType } from "@/lib/definition";
import Image from "next/image";
import { isTimeExpired } from "@/lib/isTimeExpired";
import Link from "next/link";

const DebateCard = ({ debate }: { debate: DebateType }) => {
  return (
    <Link href={`/debates/${debate._id}`}>
      <Card className="pt-0">
        <CardHeader className="relative  ">
          <div className="absolute top-2 right-2 text-xs bg-black text-white rounded-xl px-2">
            {isTimeExpired(debate.duration) ? (
              <div>Ended</div>
            ) : (
              <div>On going</div>
            )}
          </div>
          <div className="h-40">
            <Image
              src={debate.banner}
              alt={debate.title}
              height={300}
              width={300}
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
