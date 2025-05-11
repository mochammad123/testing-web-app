import { createApi } from "@reduxjs/toolkit/query/react";
import { baseService } from "./_baseQuery";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: baseService(),
  endpoints: (build) => ({
    authRegister: build.mutation<IResponse<null>, IAuth.PayloadRegister>({
      query: (payload) => ({
        url: "api/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    authLogin: build.mutation<
      IResponse<IAuth.ResponseLogin>,
      IAuth.PayloadLogin
    >({
      query: (payload) => ({
        url: "api/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAuthRegisterMutation, useAuthLoginMutation } = authService;
