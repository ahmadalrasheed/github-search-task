import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
  async (args) => {
    const { url, method, data, params } = args;

    try {
      const result = await axios({
        baseURL: baseUrl,
        url,
        method,
        data,
        params,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Search-App',
        },
      });
      
      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message || 'An error occurred',
        },
      };
    }
  };
