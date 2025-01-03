// src/services/api.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './apiBaseQuery'
const baseUrl = import.meta.env.VITE_BACKEND_BASE_ENDPOINT_URL
export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl, 
  }),
  endpoints: () => ({}),
})