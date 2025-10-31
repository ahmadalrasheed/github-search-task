import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './apiBaseQuery'
import { GitHubSearchResponse, GitHubUser, GitHubRepository, GitHubFork, GitHubLanguage } from '@/types/github'

const baseUrl = 'https://api.github.com'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl, 
  }),
  tagTypes: ['Search', 'User', 'Repository', 'Forks', 'Languages'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    searchUsers: builder.query<GitHubSearchResponse<GitHubUser>, { query: string; page?: number; per_page?: number; sort?: string; order?: 'asc' | 'desc' }>({
      query: ({ query, page = 1, per_page = 20, sort, order }) => ({
        url: '/search/users',
        method: 'GET',
        params: {
          q: query,
          page,
          per_page,
          ...(sort && { sort }),
          ...(order && { order }),
        },
      }),
      providesTags: (result, error, { query }) => [
        { type: 'Search' as const, id: `users-${query}` },
        ...(result?.items?.map(({ id }) => ({ type: 'User' as const, id })) || []),
      ],
    }),

    searchRepositories: builder.query<GitHubSearchResponse<GitHubRepository>, { query: string; page?: number; per_page?: number; sort?: string; order?: 'asc' | 'desc' }>({
      query: ({ query, page = 1, per_page = 20, sort, order }) => ({
        url: '/search/repositories',
        method: 'GET',
        params: {
          q: query,
          page,
          per_page,
          ...(sort && { sort }),
          ...(order && { order }),
        },
      }),
      providesTags: (result, error, { query }) => [
        { type: 'Search' as const, id: `repositories-${query}` },
        ...(result?.items?.map(({ id }) => ({ type: 'Repository' as const, id })) || []),
      ],
    }),

    getRepositoryForks: builder.query<GitHubFork[], { owner: string; repo: string; page?: number; per_page?: number }>({
      query: ({ owner, repo, page = 1, per_page = 3 }) => ({
        url: `/repos/${owner}/${repo}/forks`,
        method: 'GET',
        params: {
          page,
          per_page,
          sort: 'newest',
        },
      }),
      providesTags: (result, error, { owner, repo }) => [
        { type: 'Forks' as const, id: `${owner}-${repo}` },
      ],
      keepUnusedDataFor: 300,
      transformResponse: (response: GitHubFork[]) => {
        return Array.isArray(response) ? response : [];
      },
    }),

    getRepositoryLanguages: builder.query<GitHubLanguage, { owner: string; repo: string }>({
      query: ({ owner, repo }) => ({
        url: `/repos/${owner}/${repo}/languages`,
        method: 'GET',
      }),
      providesTags: (result, error, { owner, repo }) => [
        { type: 'Languages' as const, id: `${owner}-${repo}` },
      ],
      keepUnusedDataFor: 300,
      transformResponse: (response: GitHubLanguage) => {
        return typeof response === 'object' && response !== null ? response : {};
      },
    }),

  }),
})

export const {
  useSearchUsersQuery,
  useSearchRepositoriesQuery,
  useGetRepositoryForksQuery,
  useGetRepositoryLanguagesQuery,
} = api
