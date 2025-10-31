import React, { memo } from 'react';
import { GitHubRepository } from '@/types/github';
import { 
  ArrowTopRightOnSquareIcon, 
  StarIcon, 
  ArrowPathIcon, 
  EyeIcon,
  CalendarIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { RepositoryForks } from '@/components/repository-forks';
import { RepositoryLanguages } from '@/components/repository-languages';
import { formatDate, formatNumber } from '@/utils';
import { getLanguageColor } from '@/constants';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = memo(({ repository }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full w-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {repository.name}
            </h3>
            {repository.fork && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                Fork
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <a
              href={repository.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {repository.owner.login}
            </a>
            <span className="mx-1">/</span>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {repository.name}
            </a>
          </p>
        </div>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 ml-4"
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </a>
      </div>

      <div className="flex-grow">
        {repository.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{repository.description}</p>
        )}

        {repository.language && (
          <div className="mb-4 flex items-center flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(repository.language)}`}
            >
              <CodeBracketIcon className="h-3 w-3 mr-1" />
              {repository.language}
            </span>
            <RepositoryLanguages repository={repository} showSeeMore={true} />
          </div>
        )}

        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-4 w-4" />
            <span>{formatNumber(repository.stargazers_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ArrowPathIcon className="h-4 w-4" />
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <EyeIcon className="h-4 w-4" />
            <span>{formatNumber(repository.watchers_count)}</span>
          </div>
          {repository.open_issues_count > 0 && (
            <div className="flex items-center space-x-1">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{formatNumber(repository.open_issues_count)}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <RepositoryForks repository={repository} />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="h-4 w-4" />
          <span>Updated {formatDate(repository.updated_at)}</span>
        </div>
        {repository.license && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {repository.license.name}
          </span>
        )}
      </div>
    </div>
  );
});
