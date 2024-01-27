import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt-token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["smartphone-list"],
});
