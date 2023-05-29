import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }),
  reducerPath: "adminApi", //name ng api slice
  tagTypes: ["User", "Products", "Customers", "Transactions"], //basically parang eto ung state name
  endpoints: (build) => ({
    getUser: build.query({
      //hook to dito natin ipapass ung id etc eto bale ung function na useGetUserQuery
      query: (id) => `general/user/${id}`, //path set in router
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
  }),
});
export default api;
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
  useGetCustomersQuery,
} = api; //use +GetUser + Query
