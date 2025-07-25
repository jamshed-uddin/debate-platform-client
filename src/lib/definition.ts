export type DebateType = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  category: string;
  banner: string;
  duration: number;
  tags: string[];
  participants: ParticipantType[];
  winnerStatus: "Support" | "Oppose" | "Draw";
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  token: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export const debateCategories = [
  "politics",
  "technology",
  "ethics",
  "education",
  "environment",
  "health",
  "culture",
  "future",
] as const;

export type DebateCategoryType = (typeof debateCategories)[number];

export type ParticipantType = {
  _id: string;
  userId: UserType | string;
  debateId: string;
  side: "Support" | "Oppose";
  createdAt: string;
  updatedAt: string;
};

export type ArgumentType = {
  _id: string;
  userId: string;
  debateId: string;
  content: string;
  votes: string[];
  voteCount: number;
  user: ParticipantType;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

export type ScorerType = {
  totalDebates: string;
  totalVotes: string;
  userId: string;
  name: string;
};
