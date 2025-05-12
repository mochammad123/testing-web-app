import { createApi } from "@reduxjs/toolkit/query/react";
import { baseService } from "./_baseQuery";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: baseService(),
  endpoints: (build) => ({
    getUsers: build.query<IResponse<IUser.ResponseGetUser[]>, void>({
      query: () => ({
        url: "api/users",
      }),
    }),
    createUser: build.mutation<IResponse<null>, IUser.PayloadCreateUser>({
      query: (payload) => ({
        url: "api/users",
        method: "POST",
        body: payload,
      }),
    }),
    updateUser: build.mutation<IResponse<null>, IUser.PayloadUpdateUser>({
      query: (payload) => ({
        url: `api/users/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUser: build.mutation<IResponse<null>, IUser.PayloadDeleteUser>({
      query: (payload) => ({
        url: `api/users/${payload.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userService;
