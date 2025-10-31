import React, { useState, useEffect, useCallback } from 'react';
import { useSearchUsersQuery, useSearchRepositoriesQuery } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SearchInput } from '@/components/search';
import { TypeSelector } from '@/components/type-selector';
import { UserCard } from '@/components/user-card';
import { RepositoryCard } from '@/components/repository-card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ErrorMessage } from '@/components/error-message';
import { EmptyState } from '@/components/empty-state';
import { ErrorBoundary } from '@/components/error-boundary';
import { GitHubUser, GitHubRepository } from '@/types/github';

const ITEMS_PER_PAGE = 20;

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'users' | 'repositories'>('repositories');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<(GitHubUser | GitHubRepository)[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setAllResults([]);
    setPage(1);
    setHasMore(true);
    setIsSearching(!!debouncedQuery && debouncedQuery.length >= 2);
  }, [debouncedQuery, searchType]);

  const shouldSearch = debouncedQuery && debouncedQuery.length >= 2;

  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    isFetching: usersFetching,
  } = useSearchUsersQuery(
    {
      query: debouncedQuery,
      page,
      per_page: ITEMS_PER_PAGE,
    },
    {
      skip: !shouldSearch || searchType !== 'users',
    }
  );

  const {
    data: reposData,
    error: reposError,
    isLoading: reposLoading,
    isFetching: reposFetching,
  } = useSearchRepositoriesQuery(
    {
      query: debouncedQuery,
      page,
      per_page: ITEMS_PER_PAGE,
    },
    {
      skip: !shouldSearch || searchType !== 'repositories',
    }
  );

  const currentData = searchType === 'users' ? usersData : reposData;
  const currentError = searchType === 'users' ? usersError : reposError;
  const currentLoading = searchType === 'users' ? usersLoading : reposLoading;
  const currentFetching = searchType === 'users' ? usersFetching : reposFetching;

  useEffect(() => {
    if (currentData?.items && shouldSearch) {
      if (page === 1) {
        setAllResults(currentData.items);
      } else {
        setAllResults(prev => [...prev, ...currentData.items]);
      }
      setHasMore(currentData.items.length === ITEMS_PER_PAGE);
    }
  }, [currentData, page, shouldSearch]);

  const loadMore = useCallback(() => {
    if (!currentFetching && hasMore && shouldSearch) {
      setPage(prev => prev + 1);
    }
  }, [currentFetching, hasMore, shouldSearch]);

  const { loadMoreRef } = useInfiniteScroll({
    hasMore,
    isLoading: currentFetching,
    onLoadMore: loadMore,
    threshold: 0.1,
  });

  const handleRetry = useCallback(() => {
    setPage(1);
    setAllResults([]);
    setHasMore(true);
  }, []);

  const handleTypeChange = useCallback((type: 'users' | 'repositories') => {
    setSearchType(type);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const isLoading = currentLoading && page === 1;
  const hasResults = allResults.length > 0;
  const showEmptyState = !isLoading && !currentError && !isSearching;
  const showNoResults = !isLoading && !currentError && isSearching && !hasResults;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub Search</h1>
            <p className="text-gray-600">Search for users and repositories on GitHub</p>
          </div>

          <div className="space-y-6">
            <TypeSelector
              selectedType={searchType}
              onTypeChange={handleTypeChange}
              disabled={isLoading}
            />
            <SearchInput
              value={query}
              onChange={handleQueryChange}
              placeholder={`Search ${searchType}...`}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <LoadingSpinner size="lg" text="Searching..." />
        )}

        {currentError ? (
          <ErrorMessage
            title="Search Failed"
            message="An error occurred while searching. Please try again."
            onRetry={handleRetry}
          />
        ) : null}

        {showEmptyState && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start searching for {searchType}
              </h3>
              <p className="text-sm text-gray-500">
                Enter at least 2 characters to begin your search
              </p>
            </div>
          </div>
        )}

        {showNoResults && (
          <EmptyState type={searchType} query={debouncedQuery} />
        )}

        {hasResults && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentData?.total_count ? (
                    <>
                      {currentData.total_count.toLocaleString()} {searchType} found
                      {currentData.incomplete_results && (
                        <span className="text-sm text-gray-500 ml-2">
                          (results may be incomplete)
                        </span>
                      )}
                    </>
                  ) : (
                    `${allResults.length} ${searchType} found`
                  )}
                </h2>
                {currentFetching && page > 1 && (
                  <LoadingSpinner size="sm" text="Loading more..." />
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {allResults.map((item) => (
                <ErrorBoundary key={item.id}>
                  <div className="flex">
                    {searchType === 'users' ? (
                      <UserCard user={item as GitHubUser} />
                    ) : (
                      <RepositoryCard repository={item as GitHubRepository} />
                    )}
                  </div>
                </ErrorBoundary>
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="mt-8">
                {currentFetching && (
                  <LoadingSpinner size="md" text="Loading more results..." />
                )}
              </div>
            )}

            {!hasMore && allResults.length > 0 && (
              <div className="text-center mt-8 py-4">
                <p className="text-sm text-gray-500">You've reached the end of the results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};