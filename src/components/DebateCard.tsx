import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { DebateType } from "@/lib/definition";

const DebateCard = ({ debate }: { debate: DebateType }) => {
  return (
    <Card>
      <CardHeader>photo</CardHeader>
      <CardFooter>
        <h3>{debate.title}</h3>
      </CardFooter>
    </Card>
  );
};

export default DebateCard;
