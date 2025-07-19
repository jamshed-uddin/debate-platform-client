import { baseApi } from "./baseApi";

const argumentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postArgument: builder.mutation<
      { message: string },
      { debateId: string; content: string }
    >({
      query: (body) => ({
        url: "/arguments",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostArgumentMutation } = argumentApi;
