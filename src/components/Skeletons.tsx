import { Skeleton } from "./ui/skeleton";

export const CardListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton key={idx} className="h-48 w-full" />
      ))}
    </div>
  );
};

export const DebateDetailsSkeleton = () => {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="space-y-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export const ArgumentListSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton key={idx} className="h-20 w-full" />
      ))}
    </div>
  );
};
export const ParticipantListSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton key={idx} className="h-12 w-full" />
      ))}
    </div>
  );
};
