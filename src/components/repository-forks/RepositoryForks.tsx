import React from 'react';
import { GitHubRepository } from '@/types/github';
import { useGetRepositoryForksQuery } from '@/services/api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Popover } from '@/components/popover';

interface RepositoryForksProps {
  repository: GitHubRepository;
}

export const RepositoryForks: React.FC<RepositoryForksProps> = ({ repository }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [owner, repo] = repository.full_name.split('/');
  
  const { data: forks = [], isLoading: forksLoading, error: forksError } = useGetRepositoryForksQuery(
    { owner, repo, per_page: 3 },
    { 
      skip: !isOpen || !repository.full_name || repository.forks_count === 0,
    }
  );

  if (repository.forks_count === 0) {
    return null;
  }

  const trigger = (
    <button
      className="inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
    >
      <ArrowPathIcon className="h-3 w-3" />
      <span>View Latest Forks ({repository.forks_count})</span>
    </button>
  );

  const content = (
    <>
      {forksLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-sm text-gray-600">Loading forks...</span>
        </div>
      )}

      {!!forksError && (
        <div className="text-center py-8">
          <p className="text-sm text-red-600">Failed to load forks</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      )}

      {!forksLoading && !forksError && forks.length > 0 && (
        <div className="space-y-3">
          {forks.map((fork) => (
            <div key={fork.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <img
                src={fork.owner.avatar_url}
                alt={`${fork.owner.login}'s avatar`}
                className="h-8 w-8 rounded-full border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTE2IDE2QzE4LjIwOTEgMTYgMjAgMTQuMjA5MSAyMCAxMkMyMCA5Ljc5MDg2IDE4LjIwOTEgOCAxNiAxNkMxMy43OTA5IDggMTIgOS43OTA4NiAxMiAxMkMxMiAxNC4yMDkxIDEzLjc5MDkgMTYgMTYgMTZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik04IDI0QzggMjIuMzQzMSA5LjM0MzE1IDIxIDExIDIxSDIxQzIyLjY1NjkgMjEgMjQgMjIuMzQzMSAyNCAyNFYyNkg4VjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                }}
              />
              <div className="flex-1 min-w-0">
                <a
                  href={fork.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors block truncate"
                >
                  {fork.owner.login}
                </a>
                <p className="text-xs text-gray-500 truncate">
                  Forked repository
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!forksLoading && !forksError && forks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No forks found</p>
        </div>
      )}
    </>
  );

  const footer = (
    <a
      href={`https://github.com/${repository.full_name}/network/members`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
    >
      View all forks on GitHub →
    </a>
  );

  return (
    <Popover
      trigger={trigger}
      title={`Latest Forks (${repository.forks_count})`}
      shouldRender={repository.forks_count > 0}
      footer={footer}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {content}
    </Popover>
  );
};