/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/services/api';

const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

export const createMockRepository = () => ({
  id: 1,
  name: 'test-repo',
  full_name: 'test-owner/test-repo',
  html_url: 'https://github.com/test-owner/test-repo',
  description: 'A test repository',
  language: 'TypeScript',
  languages_url: 'https://api.github.com/repos/test-owner/test-repo/languages',
  forks_count: 10,
  stargazers_count: 100,
  watchers_count: 50,
  open_issues_count: 5,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  pushed_at: '2024-01-15T00:00:00Z',
  clone_url: 'https://github.com/test-owner/test-repo.git',
  ssh_url: 'git@github.com:test-owner/test-repo.git',
  size: 1000,
  default_branch: 'main',
  topics: ['react', 'typescript'],
  license: {
    key: 'mit',
    name: 'MIT License',
    spdx_id: 'MIT',
    url: 'https://api.github.com/licenses/mit',
  },
  fork: false,
  forks_url: 'https://api.github.com/repos/test-owner/test-repo/forks',
  owner: {
    id: 1,
    login: 'test-owner',
    avatar_url: 'https://github.com/test-owner.png',
    html_url: 'https://github.com/test-owner',
  },
});

export const createMockUser = () => ({
  id: 1,
  login: 'test-user',
  avatar_url: 'https://github.com/test-user.png',
  html_url: 'https://github.com/test-user',
  type: 'User',
  name: 'Test User',
  bio: 'A test user',
  public_repos: 50,
  followers: 100,
  following: 50,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  node_id: 'MDQ6VXNlcjE=',
  gravatar_id: '',
  url: 'https://api.github.com/users/test-user',
  followers_url: 'https://api.github.com/users/test-user/followers',
  following_url: 'https://api.github.com/users/test-user/following',
  gists_url: 'https://api.github.com/users/test-user/gists',
  starred_url: 'https://api.github.com/users/test-user/starred',
  subscriptions_url: 'https://api.github.com/users/test-user/subscriptions',
  organizations_url: 'https://api.github.com/users/test-user/orgs',
  repos_url: 'https://api.github.com/users/test-user/repos',
  events_url: 'https://api.github.com/users/test-user/events',
  received_events_url: 'https://api.github.com/users/test-user/received_events',
  user_view_type: 'default',
  site_admin: false,
  score: 1,
});

