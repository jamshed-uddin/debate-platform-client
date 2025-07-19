export const hasJoinedDebate = (
  participants: { userId: string; _id: string }[],
  userId: string
) => {
  const joined = participants?.find((indv) => indv.userId === userId);

  return !!joined;
};
