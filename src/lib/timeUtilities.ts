export const remainingDebateTime = (createdAt: string, duration: number) => {
  const created = new Date(createdAt);

  return Math.ceil((duration - (Date.now() - created.getTime())) / 3600000);
};

export const formatTimestamps = (dateIsoString: string) => {
  const formatted = new Date(dateIsoString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatted;
};
