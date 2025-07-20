export const remainingDebateTime = (createdAt: string, duration: number) => {
  const created = new Date(createdAt);

  return Math.floor((duration - (Date.now() - created.getTime())) / 3600000);
};
