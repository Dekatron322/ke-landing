import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blumenos-e0fba1f74776.herokuapp.com",
    prepareHeaders: (headers) => {
      // You can add authentication headers here if needed
      // headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ["User", "Customer", "Vendor", "Transaction", "Hmo"],
  endpoints: () => ({}),
})
