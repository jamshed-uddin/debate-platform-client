import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["VOTES", "PARTICIPANTS"],
});
