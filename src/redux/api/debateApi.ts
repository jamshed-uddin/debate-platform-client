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

    deleteDebate: builder.mutation<{ message: string }, string>({
      query: (debateId) => ({
        url: `/debates/${debateId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateDebateMutation,
  useUpdateDebateMutation,
  useDeleteDebateMutation,
} = debateApi;
