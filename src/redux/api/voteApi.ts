import { baseApi } from "./baseApi";

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addVote: builder.mutation<
      { message: string },
      { argumentId: string; debateId: string }
    >({
      query: (body) => ({
        url: "/votes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),

    removeVote: builder.mutation<{ message: string }, string>({
      query: (argumentId) => ({
        url: `/votes/${argumentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),
  }),
});

export const { useAddVoteMutation, useRemoveVoteMutation } = voteApi;
