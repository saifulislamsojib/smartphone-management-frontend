import { baseApi } from "@/redux/api/baseApi";
import { Response } from "@/types/common.type";
import { Auth, LoginPayload, RegisterPayload, User } from "@/types/user.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<Response<User>, unknown>({
      query: () => "auth/me",
    }),
    login: builder.mutation<Response<Auth>, LoginPayload>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation<Response<Auth>, RegisterPayload>({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentUserQuery } =
  authApi;
