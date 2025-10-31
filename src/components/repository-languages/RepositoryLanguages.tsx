import React from 'react';
import { GitHubRepository } from '@/types/github';
import { useGetRepositoryLanguagesQuery } from '@/services/api';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { calculateLanguagePercentages } from '@/utils';
import { Popover } from '@/components/popover';

interface RepositoryLanguagesProps {
  repository: GitHubRepository;
  showSeeMore: boolean;
}

export const RepositoryLanguages: React.FC<RepositoryLanguagesProps> = ({ 
  repository, 
  showSeeMore 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [owner, repo] = repository.full_name.split('/');
  
  const { data: languages = {}, isLoading: languagesLoading, error: languagesError } = 
    useGetRepositoryLanguagesQuery(
      { owner, repo },
      { 
        skip: !isOpen || !repository.full_name || !showSeeMore,
      }
    );

  if (!showSeeMore) {
    return null;
  }

  const languagePercentages = calculateLanguagePercentages(languages);

  const trigger = (
    <button
      className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors ml-2"
    >
      see more
    </button>
  );

  const content = (
    <>
      {languagesLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-sm text-gray-600">Loading languages...</span>
        </div>
      )}

      {!!languagesError && (
        <div className="text-center py-8">
          <p className="text-sm text-red-600">Failed to load languages</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      )}

      {!languagesLoading && !languagesError && languagePercentages.length > 0 && (
        <div className="space-y-3">
          {languagePercentages.map((lang) => (
            <div key={lang.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CodeBracketIcon className="h-3 w-3 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {lang.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {lang.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {!languagesLoading && !languagesError && languagePercentages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No language data available</p>
        </div>
      )}
    </>
  );

  return (
    <Popover
      trigger={trigger}
      title="Languages"
      shouldRender={showSeeMore}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {content}
    </Popover>
  );
};