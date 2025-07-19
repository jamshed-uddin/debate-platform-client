export type DebateType = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  category: string;
  banner: string;
  duration: number;
  tags: string[];
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
