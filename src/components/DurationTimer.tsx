"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

const DurationTimer = ({
  durationInMili,
  createdAt,
}: {
  durationInMili: number;
  createdAt: string;
}) => {
  const [mounted, setMounted] = useState<boolean | null>(null);
  const createTime = new Date(createdAt);
  const expiryTimestamp = new Date(createTime.getTime() + durationInMili);

  // min and sec to show timer
  const { hours, minutes, seconds } = useTimer({ expiryTimestamp });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div
        className={clsx(
          "text-sm px-2 flex items-center gap-1",
          !hours && !minutes && !seconds ? "text-red-500" : ""
        )}
      >
        <ClockIcon className="w-4 h-4 inline" />
        <div>
          {hours > 0 && <span>{hours} :</span>} <span>{minutes}</span> :{" "}
          <span>{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default DurationTimer;
