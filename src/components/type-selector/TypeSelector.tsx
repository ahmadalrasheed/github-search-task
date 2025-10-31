import React from 'react';
import { UserGroupIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface TypeSelectorProps {
  selectedType: 'users' | 'repositories';
  onTypeChange: (type: 'users' | 'repositories') => void;
  disabled?: boolean;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  disabled = false,
}) => {
  const types = [
    {
      id: 'users' as const,
      label: 'Users',
      icon: UserGroupIcon,
      description: 'Search for GitHub users',
    },
    {
      id: 'repositories' as const,
      label: 'Repositories',
      icon: CodeBracketIcon,
      description: 'Search for GitHub repositories',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {types.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onTypeChange(type.id)}
            disabled={disabled}
            className={`
              relative flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-200
              ${isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex flex-col items-center space-y-1">
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium">{type.label}</span>
              <span className="text-xs text-gray-500 text-center">{type.description}</span>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

