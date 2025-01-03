// src/services/apiBaseQuery.ts
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type { RootState } from "@/store";

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async (args, api) => {
    const { url, method, data, params } = args;
    const { getState } = api;
    const token = (getState() as RootState).auth.token;

    try {
      const result = await axios({
        baseURL: baseUrl,
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      // Detect 401
      if (err.response?.status === 401) {
        window.location.href = "/";
        return {
          error: {
            status: 401,
            data: "Unauthorized - user is being redirected to /",
          },
        };
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
