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
      { debateId: string; content: string; side: "Support" | "Oppose" }
    >({
      query: (body) => ({
        url: "/arguments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),
    editArgument: builder.mutation<
      { message: string },
      { argumentId: string; content: string }
    >({
      query: ({ argumentId, content }) => ({
        url: `/arguments/${argumentId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),

    deleteArgument: builder.mutation({
      query: (argumentId) => ({
        url: `/arguments/${argumentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ARGUMENTS"],
    }),
  }),
});

export const {
  useGetArgumentQuery,
  usePostArgumentMutation,
  useEditArgumentMutation,
  useDeleteArgumentMutation,
} = argumentApi;
