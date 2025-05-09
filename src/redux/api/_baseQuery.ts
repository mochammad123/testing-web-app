import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { COOKIES_NAME } from "../../lib/variables/example";
import Cookies from "js-cookie";

export const baseService = () => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get(COOKIES_NAME.Token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
    responseHandler: (response) => response.json(),
  });
};
