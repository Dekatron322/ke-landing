"use client"
import { apiSlice } from "./apiSlice"
import { CustomerLookupRequest, CustomerLookupResponse } from "../../types/api"

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    lookupCustomer: builder.query<CustomerLookupResponse, CustomerLookupRequest>({
      query: (params) => ({
        url: "/customers/lookup",
        params,
      }),
    }),
  }),
})

// Export hooks
export const { useLookupCustomerQuery } = customerApi
