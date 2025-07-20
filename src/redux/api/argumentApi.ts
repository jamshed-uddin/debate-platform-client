import { ArgumentType } from "@/lib/definition";
import { baseApi } from "./baseApi";

const argumentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArgument: builder.query<ArgumentType[], string>({
      query: (debateId) => `/arguments?debateId=${debateId}`,
      providesTags: ["ARGUMENTS"],
    }),
    postArgument: builder.mutation<
      { message: string },
      { debateId: string; content: string }
    >({
      query: (body) => ({
        url: "/arguments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),
  }),
});

export const { useGetArgumentQuery, usePostArgumentMutation } = argumentApi;
