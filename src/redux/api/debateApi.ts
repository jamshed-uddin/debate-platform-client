import { baseApi } from "./baseApi";

const debateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDebate: builder.mutation({
      query: (body) => ({
        url: "/debates",
        method: "POST",
        body,
      }),
    }),
    updateDebate: builder.mutation({
      query: (body) => ({
        url: `/debates/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useCreateDebateMutation, useUpdateDebateMutation } = debateApi;
