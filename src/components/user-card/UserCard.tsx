import React from 'react';
import { GitHubUser } from '@/types/github';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full w-full">
      <div className="flex flex-col items-center justify-center flex-grow pb-6">
        <div className="mb-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik02IDE2QzYgMTQuMzQzMSA3LjM0MzE1IDEzIDkgMTNIMTVDMTYuNjU2OSAxMyAxOCAxNC4zNDMxIDE4IDE2VjE4SDZWMThaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
            }}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {user.name || user.login}
          </a>
        </h3>
        {user.name && (
          <p className="text-sm text-gray-500 text-center mt-1">@{user.login}</p>
        )}
      </div>

      <div className="mt-auto">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full"
        >
          <span>View Profile</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

