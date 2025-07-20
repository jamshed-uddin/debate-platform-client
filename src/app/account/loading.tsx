import { CardListSkeleton } from "@/components/Skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <div>
        <Skeleton className="h-14 w-1/2" />
      </div>
      <div className="mt-7">
        <CardListSkeleton />
      </div>
    </div>
  );
};

export default loading;
