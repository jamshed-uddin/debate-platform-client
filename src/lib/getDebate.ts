import { DebateType } from "./definition";
import { requestClient } from "./requestClient";

export const getDebate = async (id: string) => {
  const debate = await requestClient<DebateType>(`/debates/${id}`, {
    method: "GET",
  });

  return debate;
};
