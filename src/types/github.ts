export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  node_id: string;
  gravatar_id: string;
  url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  user_view_type: string;
  site_admin: boolean;
  score: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  owner: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
  };
  language?: string;
  languages_url: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  clone_url: string;
  ssh_url: string;
  size: number;
  default_branch: string;
  topics: string[];
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  };
  fork: boolean;
  forks_url: string;
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface GitHubFork {
  id: number;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url?: string;
  };
  created_at?: string;
  updated_at?: string;
}


export interface GitHubLanguage {
  [language: string]: number;
}
