import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  type: 'users' | 'repositories';
  query?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, query }) => {
  const getMessage = () => {
    if (query) {
      return `No ${type} found for "${query}"`;
    }
    return `No ${type} to display`;
  };

  const getDescription = () => {
    if (query) {
      return `Try adjusting your search terms or filters to find what you're looking for.`;
    }
    return `Start searching to find ${type} on GitHub.`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{getMessage()}</h3>
        <p className="text-sm text-gray-500 max-w-md">{getDescription()}</p>
      </div>
    </div>
  );
};

