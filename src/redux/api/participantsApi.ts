import { ParticipantType } from "@/lib/definition";
import { baseApi } from "./baseApi";

const participantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<ParticipantType[], string>({
      query: (debateId) => `/participants?debateId=${debateId}`,
      providesTags: ["PARTICIPANTS"],
    }),
    addParticipant: builder.mutation<
      { message: string },
      { debateId: string; side: "Support" | "Oppose" }
    >({
      query: (body) => ({
        url: "/participants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PARTICIPANTS"],
    }),

    removeParticipants: builder.mutation<{ message: string }, string>({
      query: (participantId) => ({
        url: `/participants/${participantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARTICIPANTS"],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useAddParticipantMutation,
  useRemoveParticipantsMutation,
} = participantsApi;
