import { ParticipantType } from "./definition";

export const hasJoinedDebate = (
  participants: ParticipantType[],
  userId: string
) => {
  const joined = participants?.find((indv) => indv.userId === userId);

  return !!joined;
};
