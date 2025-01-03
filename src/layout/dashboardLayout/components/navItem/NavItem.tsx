import React from "react";
import { classNames } from "@/utils/classNames";

interface NavItemProps {
  name: string;
  path: string;
  icon: any;
  isActive: boolean;
  onNavigate: (path: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  name,
  path,
  icon: Icon,
  isActive,
  onNavigate,
}) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => onNavigate(path)}
        className={classNames(
          isActive
            ? "bg-indigo-700 text-white"
            : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
          "group flex w-full gap-x-3 rounded-md p-2 text-left text-sm font-semibold"
        )}
      >
        <Icon
          aria-hidden="true"
          className={classNames(
            isActive ? "text-white" : "text-indigo-200 group-hover:text-white",
            "h-6 w-6 shrink-0"
          )}
        />
        {name}
      </button>
    </li>
  );
};
