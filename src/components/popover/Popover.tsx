import React, { useState, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PopoverProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  onOpen?: () => void;
  onClose?: () => void;
  defaultOpen?: boolean;
  shouldRender?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  title,
  children,
  footer,
  width = 'w-80',
  onOpen,
  onClose,
  defaultOpen = false,
  shouldRender = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    if (newOpenState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="relative">
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={handleClose}
          />
          
          <div className={`absolute top-full left-0 mt-2 ${width} bg-white rounded-lg shadow-lg border border-gray-200 z-50`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close popover"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {children}
            </div>

            {footer && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                {footer}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};